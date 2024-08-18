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
            <el-popover
                placement="bottom"
                title="主题设置"
                :width="400"
                trigger="click"
            >
                <template #reference>
                    <el-button :icon="Setting" circle />
                </template>
                <el-form>
                    <el-form-item label = "主题颜色">
                        <el-color-picker v-model="color" show-alpha :predefine="predefineColors" />
                    </el-form-item>
                    <el-form-item label = "暗黑模式">
                        <el-switch
                            v-model="isDark"
                            style="margin-left: 24px"
                            inline-prompt
                            active-icon="Moon"
                            inactive-icon="Sunny"
                            @change = "changeDark"
                        />
                    </el-form-item>
                </el-form>
            </el-popover>
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
    import useUserStore from '../../store/modules/user';
    import { useRouter, useRoute } from 'vue-router';
    import { ref } from 'vue';
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

    //颜色
    const color = ref('rgba(255, 69, 0, 0.68)')
    const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
    ]);

    //暗黑
    let isDark = ref(false);

    const changeDark = () => {
        let html = document.documentElement;
        isDark.value ? html.className = 'dark' : html.className = ''
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