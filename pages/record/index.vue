<template>
    <section class="container">
        <mt-header fixed :title="planName||'点滴记录'">
            <mt-button slot='left' @click="addRecord()" v-if="planId">增加记录</mt-button>
        </mt-header>
        <record ref="recordList" from='record' :planId="planId" ></record>
        <Footer></Footer>
    </section>
</template>
<script>
    import record from '~/components/common/record'
    import Header from '~/components/Header'
    import Footer from '~/components/Footer'
    export default {
        async asyncData({query}){
            return {
                planId: query.planId,
                planName: query.planName
            }
        },
        data() {
            return {
                planId: 0,
                planName: ''
            }
        },
        methods:{
            addRecord(){
                this.$refs['recordList'].addRecord()
            }
        },
        components: {
            record,
            Header,
            Footer
        },

    }
</script>
<style scoped>
    .planName {
        padding:0.2rem;
        text-align: center;
    }
</style>