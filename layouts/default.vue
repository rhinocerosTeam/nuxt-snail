<template>
    <div>
        <mt-header fixed :title="globalMark.name">
            <mt-button  slot="right" @click="popupVisibleFN(true)">标签</mt-button>
        </mt-header>


        <nuxt />


        <mt-tabbar v-model="selected">
            <mt-tab-item id="tab1">
                <img slot="icon" src="../assets/img/icon/bar_plan_active.png" v-if="selected == 'tab1'">
                <img slot="icon" src="../assets/img/icon/bar_plan.png" v-else>
                待办事项
            </mt-tab-item>
            <mt-tab-item id="tab2">
                <img slot="icon" src="../assets/img/icon/bar_record_active.png" v-if="selected == 'tab2'">
                <img slot="icon" src="../assets/img/icon/bar_record.png" v-else>
                记录
            </mt-tab-item>
            <mt-tab-item id="tab3">
                <img slot="icon" src="../assets/img/icon/bar_wo_active.png" v-if="selected == 'tab3'">
                <img slot="icon" src="../assets/img/icon/bar_wo.png" v-else>
                我的
            </mt-tab-item>
        </mt-tabbar>
        <mt-popup
                v-model="popupVisible"
                position="right">
                <marks :popupVisibleFN = 'popupVisibleFN'></marks>
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
            selected:'tab1',
            popupVisible:false
        }
    },
    methods:{
        popupVisibleFN(flag){
            this.popupVisible = flag
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