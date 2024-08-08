<template>
    <div class = "layout_container">
        <div class = "layout_slider"  :class = "{fold: settingStore.fold}">
            <Logo></Logo>
            <el-scrollbar class = "scrollBar">
                <el-menu background-color = "#001529" text-color = "white" active-text-color = "yellowgreen" :default-active = "$route.path" :collapse = "settingStore.fold">
                    <Menu :menuList = "useStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class = "layout_tabber" :class = "{fold: settingStore.fold}">
            <Tabbar></Tabbar>
        </div>
        <div class = "layout_main" :class = "{fold: settingStore.fold}" v-if = "settingStore.refresh">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang = "ts">
    import Logo from './Logo/index.vue';
    import Menu from './Menu/index.vue';
    import Tabbar from './Tabbar/index.vue'
    import useUserStore from '../store/modules/user';
    import { useLayOutSettingStore } from '../store/modules/setting';
    

    let settingStore = useLayOutSettingStore();

    let useStore = useUserStore();

    
</script>

<script lang = "ts">
    export default {
        name: 'layout',
    }
</script>

<style scoped lang = "scss">
.menu{
    height: calc(100vh - $base-menu-logo-height);
}

.layout_container{
    background-color: white;
    width: 100%;
    height: 100vh;
}

.layout_slider{
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;

    &.fold{
        width: $base-menu-min-width;
    }
}

.layout_tabber{
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabber-height;
    top: 0;
    left: $base-menu-width;
    background-color: yellow;
    transition: all 0.3s;

    &.fold{
        width: calc(100% - $base-menu-min-width);
        left: $base-menu-min-width;
    }
}
.layout_main{
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabber-height);
    top: $base-tabber-height;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold{
        width: calc(100% - $base-menu-min-width);
        left: $base-menu-min-width;
    }
}
.scrollBar{
    height: calc(100vh - $base-menu-logo-height);
}

.el-menu{
    border-right: none;
    
}
</style>