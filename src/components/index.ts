import SvgIcon from './SvgIcon/index.vue';
import Category from './Category/index.vue';
import test from './SvgIcon/test.vue'
import * as  ElementPlusIconsVue from '@element-plus/icons-vue'

const gloabComponents:any = { SvgIcon, test, Category}
export default {
    install(app:any){
        Object.keys(gloabComponents).forEach(key => {
            app.component(key, gloabComponents[key])
        });
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}