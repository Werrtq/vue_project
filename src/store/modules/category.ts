import { defineStore } from "pinia";
import { reqGetAttr, reqGetC1, reqGetC2, reqGetC3 } from '../../api/product/attr';
import { responseAttr } from "../../api/product/attr/type";
import { categoryState } from "../type/type";

export let useCategoryStore = defineStore('categoryStore',{
    state: ():categoryState => {
        return {
            dataArrC1: [],
            valueC1: '',
            dataArrC2: [],
            valueC2: '',
            dataArrC3: [],
            valueC3: '',
            dataAttr: [],
        }
    },

    actions: {
        async getC1(){
            let result = await reqGetC1();
            if(result.code == 200){
                this.dataArrC1 = result.data;
            }
        },

        async getC2(){
            let result = await reqGetC2(this.valueC1);
            if(result.code == 200){
                this.dataArrC2 = result.data;
            }
        },

        async getC3(){
            let result = await reqGetC3(this.valueC2);
            if(result.code == 200){
                this.dataArrC3 = result.data;
            }
        },

        async getAttr(){
            let result:responseAttr = await reqGetAttr(this.valueC1, this.valueC2, this.valueC3);
            if(result.code == 200){
                this.dataAttr = result.data;
            }
        }
    },

    getters: {

    }
})