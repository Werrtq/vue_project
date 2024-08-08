<template>
    <div class = "logo">
        <img :src = "LogoData.logoSrc" />
        <p>{{LogoData.title}}</p>
    </div>
</template>

<script setup lang = "ts">
    import LogoData from '../../setting';
</script>

<script lang = "ts">
 export default {
    name: "Logo"
 }
</script>

<style scoped lang = "scss">
.logo{
    display: flex;
    width: 100%;
    height: $base-menu-logo-height;
    align-items: center;
    padding: 10px
}

img{
    width: 40px;
    height: 40px;

}

p{
    font-size: $base-logo-title-fontSize;
    color: white;
    margin: 10px;
}
</style>