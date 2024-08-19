<template>
        <template v-for = "item in menuList">
            <template v-if = "!item.children && !item.meta.hidden">
                <el-menu-item :index = "item.path"  @click = "goRoute">
                    <el-icon>
                        <component :is = "item.meta.icon"></component>
                    </el-icon>
                    <template #title>
                        <span> {{ item.meta.title }} </span>
                    </template>
                    
                </el-menu-item>
            </template>
            <template v-if = "item.children && item.children.length == 1 && !item.children[0].meta.hidden">
                <el-menu-item :index = "item.children[0].path"  @click = "goRoute">
                    <el-icon>
                        <component :is = "item.children[0].meta.icon"></component>
                    </el-icon>
                    <template #title>
                        <span> {{ item.children[0].meta.title }} </span>
                    </template>
                    
                </el-menu-item>
            </template>
            <template v-if = "item.children && item.children.length > 1">
                <el-sub-menu :index = "item.path">
                    
                    <template #title>
                        <el-icon>
                            <component :is = "item.meta.icon"></component>
                        </el-icon>
                        <span>{{ item.meta.title }}</span>
                    </template>
                    <Menu :menuList = "item.children"></Menu>
                </el-sub-menu>
            </template>
        </template>
</template>

<script setup lang = "ts">
    import { useRouter } from 'vue-router';
    defineProps(['menuList']);
    let router = useRouter();

    const goRoute = (a:any) => {
        router.push(a.index);
    }
</script>

<script lang = "ts">
    export default {
        name: "Menu"
    }
</script>