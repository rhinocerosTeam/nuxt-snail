<template>
    <div>
        <mt-header fixed :title="globalMark.name">
            <mt-button  slot="right" @click="popupVisibleFN">标签</mt-button>
        </mt-header>
        <nuxt />
        <mt-popup
                v-model="popupVisible"
                position="right">
                <marks></marks>
        </mt-popup>
    </div>
</template>
<script>



 import marks from "~/components/marks"
 import { mapGetters, mapActions } from 'vuex'

export default {
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
        ]
    },
    computed: {
        ...mapGetters({
            markMenu: 'getMarkMenu',
            marks: 'getMarks',
            currentMark:'getCurrentMark',
            globalMark:'getGlobalMark'
        })
    },
    components:{
        marks
    },
    data(){
        return {
            popupVisible:false
        }
    },
    methods:{
        popupVisibleFN(){
            this.popupVisible = true
        },
    },

    mounted(){
//        setTimeout(()=>{
//            this.popupVisible = true
//         },2000)
        document.documentElement.style.fontSize = document.documentElement.clientWidth / (7.5) + "px";
    }
}
</script>
<style>
html,
body {
    background-color: #eee !important;
}

.container {
    margin: 0;
    width: 100%;
    /*padding: 75px 0;*/
    text-align: center;
}

.rootContainer {
    padding: 75px 0;
}

.button,
.button:visited {
    display: inline-block;
    color: black;
    letter-spacing: 1px;
    background-color: #fff;
    border: 2px solid #000;
    text-decoration: none;
    text-transform: uppercase;
    padding: 15px 45px;
}

.button:hover,
.button:focus {
    color: #fff;
    background-color: #000;
}

.title {
    color: #000;
    font-weight: 300;
    font-size: 2.5em;
    margin: 0;
}
</style>