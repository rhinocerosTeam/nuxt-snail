<template>
    <div @click="changeTab" >
        <mt-tabbar fixed v-model="selected">
            <mt-tab-item id="plan">
                <img slot="icon" src="../assets/img/icon/bar_plan_active.png" v-if="selected == routerObj.plan">
                <img slot="icon" src="../assets/img/icon/bar_plan.png" v-else>
                待办
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
</template>
<script>
    import marks from "~/components/marks"
    import {mapGetters, mapActions} from 'vuex'
    import Vue from 'vue'
    export default {
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
            }
        },
        methods: {
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
            this.initTab()

        },
        created(){

        }
    }
</script>