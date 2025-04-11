import { defineStore } from 'pinia';

interface MenuItem {
    id: number;
    name: string;
    path?: string;
    children?: MenuItem[];
}

export const useSideMenusStore = defineStore('sideMenus', {
    state: () => ({
        menus: [] as MenuItem[],
        collapsed: true,
    }),
    actions: {
        setMenus(menus: MenuItem[]) {
            this.menus = menus;
        },
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
            // console.log(this.collapsed);
        },
    },
    getters: {
        getMenus: (state) => state.menus,
        getCollapsed: (state) => state.collapsed,
    },
});


