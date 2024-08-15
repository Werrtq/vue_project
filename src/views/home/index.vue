<template>

    <el-card>
        <div class="box">
            <img :src='userStore.avatar' alt="" class = "avator" />
            <div class = "title">
                <h3>{{ getTime() }}好呀{{ userStore.userName }}</h3>
                <p>星辰甄选运营平台</p>
            </div>
        </div>
    </el-card>

</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import useUserStore from '../../store/modules/user';
let userStore = useUserStore();
onMounted(() => {
    userStore.userInfo();
});

const getTime = () => {
    let nowTimeHour = (new Date()).getHours();
    if(nowTimeHour > 19){
        return '晚上';
    } else if (nowTimeHour > 14) {
        return '下午';
    } else if (nowTimeHour > 11) {
        return '中午';
    } else if (nowTimeHour >= 0) {
        return '上午';
    }
}
</script>

<style scoped>
.box {
    display: flex;
}

.avator{
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.title{
    margin-left: 12px;
}

h3{
    font-size: 30px;
    margin-bottom: 15px;
}

p{
    font-style: italic;
    color: skyblue;
}
</style>