<template>
    <section class="plan-container">
        <Header right="mark">
            <mt-button slot='leftBtn' @click="goAddPlan()">增加</mt-button>
        </Header>
        <div class="planTab">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">全部</mt-tab-item>
                <mt-tab-item id="2">进行中</mt-tab-item>
                <mt-tab-item id="4">未开始</mt-tab-item>
                <mt-tab-item id="5">已完成</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <div class="planBox">
                        <plan :type="planType.all"></plan>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="planBox">
                        <plan :type="planType.doing"></plan>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                    <div class="planBox">
                        <plan :type="planType.notStart"></plan>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="5">
                    <div class="planBox">
                        <plan :type="planType.finish"></plan>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>

        <Footer></Footer>
    </section>
</template>
<script>
    import api from '~/api'
    import Utils from '~/utils/index'
    import {planStatus, planType} from '~/constant/params'
    import {mapGetters, mapActions} from 'vuex'
    import plan from '~/components/common/planList'
    import Header from '~/components/Header'
    import Footer from '~/components/Footer'
    import addPlan from '~/components/common/addPlan'

    export default {
        components:{
            plan,
            addPlan,
            Header,
            Footer
        },
        computed: {
            ...mapGetters({
                markMenu: 'getMarkMenu',
                marks: 'getMarks',
                currentMark: 'getCurrentMark',
                globalMark: 'getGlobalMark'
            })
        },
        data() {
            return {
                selected:'2',
                planList:[],
                planStatus:planStatus,
                planType:planType
            }
        },
        methods:{
            goAddPlan(){
                this.$router.push({path:'plan/addPlan'})
            },
        }

    }
</script>
<style scoped>

</style>