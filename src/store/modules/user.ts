import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "../../api/user";
import { constantRoute } from "../../router/routes";
import type { loginFormdata} from "../../api/user/type";

const useUserStore = defineStore('User',{
    state: () => {
        return {
            token: localStorage.getItem("TOKEN"),
            menuRoutes: constantRoute,
            userName: '',
            avatar: '',
        }
    },
    
    actions: {
        async userLogin(data: loginFormdata){
            let result = await reqLogin(data);
            if(result.code == 200){
                this.token = result.data;
                localStorage.setItem("TOKEN",result.data);
                return "ok";
            }else{
                return Promise.reject(new Error(result.data));
            }
        },

        async userInfo(){
            let result = await reqUserInfo();
            console.log(result);
            if(result.code == 200){
                this.userName = result.data.name;
                this.avatar = result.data.avatar;
                return 'ok'
            } else {
                return Promise.reject('获取用户失败');
            }
            
        },

        async userLogout(){
            let result = await reqLogout();
            if(result.code == 200){
                localStorage.removeItem("TOKEN");
                this.userName = '';
                this.avatar = '';
                this.token = '';
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        }
    },

    getters: {

    }
});

export default useUserStore;