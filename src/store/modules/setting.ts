import { defineStore } from 'pinia'

export let useLayOutSettingStore = defineStore('SettingStore',{
    state: () => {
        return {
            fold: false,
            refresh: true
        }
    }
})