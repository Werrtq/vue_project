<template>
    <div>
        <h1>我是展示页面{{ userStore.userName }}</h1>
    </div>
</template>

<script setup lang='ts'>
    import { onMounted } from 'vue';
    import useUserStore from '../../store/modules/user';
    let userStore = useUserStore();
    onMounted(() => {
        userStore.userInfo();
        console.log(userStore.userName,userStore.avatar);
    });
</script>