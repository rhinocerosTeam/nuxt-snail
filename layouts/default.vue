<template>
    <div class="container">
        <nuxt/>
    </div>
</template>


<script>

    import Vue from 'vue'
    export default {
        head: {
            meta: [
                {charset: 'utf-8'},
                {
                    name: 'viewport',
                    content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
                }
            ]
        },
        computed: {
        },
        mounted(){
            document.documentElement.style.fontSize = document.documentElement.clientWidth / (7.5) + "px";
        },
        created(){

        }
    }
</script>
<style>
    html,
    body {
        background-color: #eee !important;
    }
    .container{
        margin-top: 40px;
        padding-bottom:55px ;
    }

</style>