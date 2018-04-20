<style scoped>
    .planName {
        padding: 0.2rem;
        text-align: center;
    }
    .CalendarBox{
        margin-top:40px;
    }

</style>

<template>
    <section class="container">
        <mt-header fixed :title="planName||'点滴记录'">
            <mt-button slot='left' @click="addRecord()" v-if="planId">增加记录</mt-button>
        </mt-header>

        <record ref="recordList" from='record' :planId="planId" :startDatetime="startDatetime" :endDatetime="endDatetime"></record>
        <Footer></Footer>
    </section>
</template>
<script>
    import record from '~/components/common/record'
    import Header from '~/components/Header'
    import Footer from '~/components/Footer'
    import Calendar from '~/components/tool/vue-calendar-component/calendar';

    export default {
        async asyncData({isClient, query}){
            return {
                planId: query.planId,
                planName: query.planName,
                startDatetime: query.startDatetime,
                endDatetime: query.endDatetime,
                isClient
            }
        },
        data() {
            return {
                planId: 0,
                planName: '',
                arr:  [{
                    date: '2018/4/1',
                    className: "mao"
                }]
            }
        },
        mounted(){

            console.log('-->',this.startDatetime)

        },
        methods: {
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
