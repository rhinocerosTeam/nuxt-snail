<template>
    <div>
        <mt-header fixed :title="globalMark.name">
            <mt-button slot="left" @click="popupVisibleFN(true)">标签</mt-button>
            <mt-button slot="right" @click="goAddPlan()">增加计划</mt-button>
        </mt-header>

        <div class="container">
            <nuxt/>
        </div>

        <div @click="changeTab" >
            <mt-tabbar fixed v-model="selected">
                <mt-tab-item id="plan">
                    <img slot="icon" src="../assets/img/icon/bar_plan_active.png" v-if="selected == routerObj.plan">
                    <img slot="icon" src="../assets/img/icon/bar_plan.png" v-else>
                    待办事项
                </mt-tab-item>
                <mt-tab-item id="record">
                    <img slot="icon" src="../assets/img/icon/bar_record_active.png" v-if="selected == routerObj.record">
                    <img slot="icon" src="../assets/img/icon/bar_record.png" v-else>
                    记录
                </mt-tab-item>
                <mt-tab-item id="me">
                    <img slot="icon" src="../assets/img/icon/bar_wo_active.png" v-if="selected == routerObj.user">
                    <img slot="icon" src="../assets/img/icon/bar_wo.png" v-else>
                    我的
                </mt-tab-item>
            </mt-tabbar>
        </div>

        <mt-popup
                v-model="popupVisible"
                position="right">
            <marks @popupVisibleFN='popupVisibleFN'></marks>
        </mt-popup>


    </div>
</template>


<script>

    import marks from "~/components/marks"
    import {mapGetters, mapActions} from 'vuex'
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
            ...mapGetters({
                markMenu: 'getMarkMenu',
                marks: 'getMarks',
                currentMark: 'getCurrentMark',
                globalMark: 'getGlobalMark'
            })
        },
        components: {
            marks
        },
        data(){
            return {
                routerObj:{
                    plan:'plan',
                    record:'record',
                    user:'me'
                },
                selected: '',
                popupVisible: false,
                recordVisible:true
            }
        },
        methods: {
            popupVisibleFN(flag){
                this.popupVisible = flag
            },
            goAddPlan(){
                this.selected = ''
                this.$router.push({path:'plan/addPlan'})
            },
            changeTab(){
                this.$router.push({ path: '/'+this.selected })
            },
            initTab(){
                let path = String(this.$route.path).replace("/",'')
                let {plan,record,user} = this.routerObj
                if(path == plan ||path == record || path == user ){
                    this.selected = path
                }
            }
        },
        watch: {},
        mounted(){
            document.documentElement.style.fontSize = document.documentElement.clientWidth / (7.5) + "px";
            this.initTab()

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