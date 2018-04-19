<template>
    <section class="container">
        <mt-header fixed :title="planName||'点滴记录'">
            <mt-button slot='left' @click="addRecord()" v-if="planId">增加记录</mt-button>
        </mt-header>
        <div>
            <Calendar
                    v-on:choseDay="clickDay"
                    v-on:changeMonth="changeDate"
                    v-on:isToday="clickToday"
                    :markArray=[20,21]
                    :markDate=arr
                    isHideOtherday=false
                    :agoDayHide='1514937600000'
                    :futureDayHide='1525104000000'
                    :isClient="isClient"
                    ref="calendar22"
            ></Calendar>
        </div>
        <record ref="recordList" from='record' :planId="planId"></record>
        <Footer></Footer>
    </section>
</template>
<script>
    import record from '~/components/common/record'
    import Header from '~/components/Header'
    import Footer from '~/components/Footer'
    import Calendar from '~/components/tool/vue-calendar-component/calendar';

    export default {
        async asyncData({isClient,query}){
            return {
                planId: query.planId,
                planName: query.planName,
                isClient
            }
        },
        data() {
            return {
                planId: 0,
                planName: '',
                arr: ['2018/4/1', '2018/4/3']
            }
        },
        mounted(){
            this.$refs["calendar22"].start()
        },
        methods: {
            clickDay(data) {
                console.log(data); //选中某天
            },
            changeDate(data) {
                console.log(data); //左右点击切换月份
            },
            clickToday(data) {
                console.log(data); //跳到了本月
            },
            addRecord(){
                this.$refs['recordList'].addRecord()
            }
        },
        components: {
            record,
            Header,
            Footer,
            Calendar
        },

    }
</script>
<style scoped>
    .planName {
        padding: 0.2rem;
        text-align: center;
    }
</style>