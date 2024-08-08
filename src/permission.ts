import router from "./router";
import Nprogress from 'nprogress';
import setting from "./setting";
import "nprogress/nprogress.css";
Nprogress.configure({showSpinner: false})
import pinia from "./store";
import useUserStore from './store/modules/user';

let userStore = useUserStore(pinia);

router.beforeEach(async (to, from, next) => {
    document.title = `${setting.title} - ${to.meta.title}`;
    let token = userStore.token;
    if(token){
        if(to.path == '/login'){
            next('/');
        } else {
            if(userStore.userName){
                next();
            } else {
                try{
                    await userStore.userInfo();
                    next();
                } catch(error) {
                    await userStore.userLogout();
                    next('/login');
                }
            }
        }
    } else {
        if(to.path != '/login'){
            next('/login');
        }
    }
    Nprogress.start();
    next();
})

router.afterEach((to, from) => {
    Nprogress.done();
})