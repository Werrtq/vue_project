<template>
    <div class = "tabbar">
        <div class = "tabbar_left">
            <el-icon style = "margin: 0px 10px" @click = "changeFold">
                <component :is = "settingStore.fold?'Expand':'Fold'"></component>
            </el-icon>
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item v-for = "item in $route.matched" :to = "item.path" v-show = "item.meta.title">
                    <el-icon>
                        <component :is = "item.meta.icon"></component>
                    </el-icon>
                    {{item.meta.title}}
                </el-breadcrumb-item>
                
            </el-breadcrumb>
        </div>
        <div class = "tabbar_right">
            <el-button :icon="Refresh" circle @click = "changeRefresh" />
            <el-button :icon="FullScreen" circle @click = "fullScreen" />
            <el-button :icon="Setting" circle />
            <img :src = "userStore.avatar" height = "32px" width = "32px"  style = "border-radius: 50%">
            <el-dropdown>
                <span class="el-dropdown-link">
                {{userStore.userName}}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click = "LogOut">退出登陆</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang = "ts" setup>
    import { ArrowRight, Refresh, Setting, FullScreen } from '@element-plus/icons-vue';
    import { useLayOutSettingStore } from '../../store/modules/setting';
    import { nextTick } from 'vue';
    import useUserStore from '../../store/modules/user';
    import { useRouter, useRoute } from 'vue-router';
    let $router = useRouter();
    let $route = useRoute()

    let settingStore = useLayOutSettingStore();
    let userStore = useUserStore();

    function changeFold(){
        settingStore.fold = !settingStore.fold;
    }

    const changeRefresh = () => {
        settingStore.refresh = false;
        setTimeout(() => {
            settingStore.refresh = true;
        }, 1000);
    }

    const fullScreen = () => {
        if(document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }

    const LogOut = async () => {
        await userStore.userLogout();
        $router.push('/login');
    }
</script>

<script lang = "ts">
    export default {
        name: 'Tabber',
    }
</script>

<style lang = "scss" scoped>
.tabbar{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    .tabbar_left{
        align-items: center;
        display: flex;
    }

    .tabbar_right{
        align-items: center;
        display: flex;

        img{
            margin: 0px 10px;
        }
    }
}
</style>