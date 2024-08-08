<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0">12</el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :rules :model = "userData" ref = "form">
                    <h1>你好</h1>
                    <h2>请登录！</h2>
                    <el-form-item prop = "username">
                        <el-input :prefix-icon="User" v-model="userData.username"></el-input>
                    </el-form-item>
                    <el-form-item prop = "password">
                        <el-input type="password" :prefix-icon="Lock" show-password
                            v-model="userData.password"></el-input>
                    </el-form-item><el-form-item>
                        <el-button :loading class="login_btn" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import useUserStore from '../../store/modules/user';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';

const form = ref();

let asd = "<span style=\"color: red\">This should be red.</span>";
let loading = ref(false);
let userData = reactive({ username: 'admin', password: '111111' });
let useStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
const login = async function () {
    await form.value.validate();
    console.log(123);
    loading.value = true;
    let date = new Date();
    let hour = date.getHours();
    let msg;
    if (hour >= 6 && hour <= 12) {
        msg = "Hi，上午好";
    } else if (hour > 12 && hour <= 18) {
        msg = "Hi，下午好";
    } else {
        msg = "Hi，晚上好";
    }
    useStore.userLogin(userData).then(
        (re) => {
            let redirect = $route.query.redirect;
            $router.push({path: redirect||'/'});
            ElNotification({
                type: "success",
                message: msg
            })
            loading.value = false;
        },
        (er) => {
            ElNotification({
                type: "error",
                message: er.message
            })
            loading.value = false;
        }
    )

}

const rules = {
  username: [
    { required: true, message: '请输入账户名', trigger: 'blur' },
    {min: 5, message: '名字长度必须大于5', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6,  message: '密码长度必须大于6', trigger: 'change' },
  ]
}
</script>

<style scoped>
.login_container {
    width: 100%;
    height: 100vh;
    background: url('../../assets/images/background.jpg') no-repeat;
    background-size: cover;
}

.login_form {
    position: relative;
    left: 10%;
    top: 30vh;
    width: 80%;
    background: url('../../assets/images/login_form.png');
    padding: 40px;
}

h1 {
    color: white;
    font-size: 40px;
}

h2 {
    color: white;
    font-size: 20px;
    margin: 20px;
}

.login_btn {
    width: 100%;
}
</style>