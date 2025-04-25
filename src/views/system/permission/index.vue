<template>
  <div class="list-container">
    <!-- 搜索栏 -->
    <collapse-card collapsed-text="查询区">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="权限名称">
          <el-input v-model="searchForm.name" placeholder="请输入权限名称" clearable />
        </el-form-item>
        <el-form-item label="权限类型">
          <el-select v-model="searchForm.type" placeholder="请选择权限类型" clearable>
            <el-option label="菜单" :value="1" />
            <el-option label="按钮" :value="2" />
            <el-option label="接口" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </collapse-card>

    <!-- 操作按钮 -->
    <!-- <div class="operation-bar">
      <el-button type="primary" @click="handleAdd">新增权限</el-button>
      <el-button type="danger" :disabled="!selectedPermissions.length" @click="handleBatchDelete">
        批量删除
      </el-button>
    </div> -->

    <!-- 表格区域 -->
    <el-card class="table-card">
      <template #header>
        <div class="card-header">
          <span class="header-title">权限列表</span>
          <div class="operation-bar">
          <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增权限</el-button>
          <el-button type="danger" :disabled="!selectedPermissions.length" @click="handleBatchDelete">
            <el-icon><Delete /></el-icon>批量删除
          </el-button>
          </div>
        </div>
      </template>

    <el-table
      v-loading="loading"
      :data="permissionList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="权限名称" />
      <el-table-column prop="code" label="权限编码" />
      <el-table-column prop="type" label="权限类型">
        <template #default="{ row }">
          <el-tag :type="getPermissionTypeTag(row.type)">
            {{ getPermissionTypeText(row.type) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="路径" show-overflow-tooltip />
      <el-table-column prop="component" label="组件" show-overflow-tooltip />
      <el-table-column prop="icon" label="图标" show-overflow-tooltip />
      <el-table-column prop="sort" label="排序" width="80" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
          <el-button type="primary" link @click="handleAdd(row)">新增子权限</el-button>
          <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
    </div>
      </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增权限' : '编辑权限'"
      width="500px"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="上级权限" prop="parentId">
          <el-tree-select
            v-model="form.parentId"
            :data="permissionTree"
            :props="{ label: 'name', value: 'id' }"
            placeholder="请选择上级权限"
            clearable
          />
        </el-form-item>
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入权限名称" />
        </el-form-item>
        <el-form-item label="权限编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入权限编码" />
        </el-form-item>
        <el-form-item label="权限类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择权限类型">
            <el-option label="菜单" :value="1" />
            <el-option label="按钮" :value="2" />
            <el-option label="接口" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="路径" prop="path" v-if="form.type === 1">
          <el-input v-model="form.path" placeholder="请输入路径" />
        </el-form-item>
        <el-form-item label="组件" prop="component" v-if="form.type === 1">
          <el-input v-model="form.component" placeholder="请输入组件路径" />
        </el-form-item>
        <el-form-item label="图标" prop="icon" v-if="form.type === 1">
          <el-input v-model="form.icon" placeholder="请输入图标名称" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" :min="0" :max="999" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineComponent } from 'vue'
import {Plus, Delete} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'


const Permission = defineComponent({
  name: 'Permission',
})


interface Permission {
  id: string
  parentId: string
  name: string
  code: string
  type: number
  path: string
  component: string
  icon: string
  sort: number
  status: number
  children?: Permission[]
}

// 搜索表单
const searchForm = reactive({
  name: '',
  type: ''
})

// 表格数据
const loading = ref(false)
const permissionList = ref<Permission[]>([])
const selectedPermissions = ref<Permission[]>([])

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 对话框
const dialogVisible = ref(false)
const dialogType = ref('add')
const formRef = ref<FormInstance>()
const form = reactive({
  parentId: '',
  name: '',
  code: '',
  type: 1,
  path: '',
  component: '',
  icon: '',
  sort: 0,
  status: 1
})

// 权限树数据
const permissionTree = ref<Permission[]>([])

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入权限编码', trigger: 'blur' }],
  type: [{ required: true, message: '请选择权限类型', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// 方法
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  console.log('search:', searchForm)
}

const resetSearch = () => {
  searchForm.name = ''
  searchForm.type = ''
  handleSearch()
}

const handleAdd = (event?: MouseEvent, row?: Permission) => {
  dialogType.value = 'add'
  dialogVisible.value = true
  form.parentId = row?.id || ''
  form.name = ''
  form.code = ''
  form.type = 1
  form.path = ''
  form.component = ''
  form.icon = ''
  form.sort = 0
  form.status = 1
}

const handleEdit = (row: Permission) => {
  dialogType.value = 'edit'
  dialogVisible.value = true
  Object.assign(form, row)
}

const handleDelete = (row: Permission) => {
  ElMessageBox.confirm('确认删除该权限吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      // TODO: 实现删除逻辑
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}

const handleBatchDelete = () => {
  if (!selectedPermissions.value.length) {
    ElMessage.warning('请选择要删除的权限')
    return
  }

  ElMessageBox.confirm('确认删除选中的权限吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      // TODO: 实现批量删除逻辑
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}

const handleSelectionChange = (selection: Permission[]) => {
  selectedPermissions.value = selection
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      // TODO: 实现提交逻辑
      dialogVisible.value = false
      ElMessage.success(dialogType.value === 'add' ? '新增成功' : '编辑成功')
      handleSearch()
    }
  })
}

const getPermissionTypeTag = (type: number): 'success' | 'warning' | 'info' | 'primary' | 'danger' => {
  const typeMap: Record<number, 'success' | 'warning' | 'info' | 'primary' | 'danger'> = {
    1: 'success',
    2: 'warning',
    3: 'info'
  }
  return typeMap[type] || 'info'
}

const getPermissionTypeText = (type: number) => {
  const typeMap: Record<number, string> = {
    1: '菜单',
    2: '按钮',
    3: '接口'
  }
  return typeMap[type] || '未知'
}

// 分页方法
const handleSizeChange = (val: number) => {
  pageSize.value = val
  handleSearch()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  handleSearch()
}

</script>

<style scoped lang="scss">
@use '@/assets/list.scss';
</style> 