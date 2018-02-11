<template>
    <section class="plan-container">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">进行中</mt-tab-item>
            <mt-tab-item id="3">
                <img src="../../assets/img/icon/add.png" class="addPlan">
            </mt-tab-item>
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
            <mt-tab-container-item id="3">
                <div class="planBox">
                    <add-plan type="1"></add-plan>
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
    </section>
</template>
<script>
    import api from '~/api'
    import Utils from '~/utils/index'
    import {planStatus, planType} from '~/constant/params'
    import BookList from '~/components/books/BookList.vue';
    import category from '~/components/common/Category'
    import {mapGetters, mapActions} from 'vuex'
    import plan from '~/components/common/planList'
    import addPlan from '~/components/common/addPlan'

    export default {
        components:{
            plan,
            addPlan
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
                selected:1,
                planList:[],
                planStatus:planStatus,
                planType:planType

            }
        },
        methods:{

        }

    }
</script>
<style scoped>

</style>