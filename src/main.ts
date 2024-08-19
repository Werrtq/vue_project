import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import router from './router';
import pinia from './store';
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'virtual:svg-icons-register'
//import SvgIcon from './components/SvgIcon/index.vue'
import gloalComponents from './components/index'
import './styles/index.scss'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)
        app.use(ElementPlus, {
                locale: zhCn,
              })
        app.use(router)
        app.use(pinia)
        app.use(gloalComponents)
        import './permission'
        app.mount('#app')
