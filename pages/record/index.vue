<template>
    <section class="container">
        <Header>
            <mt-button slot='leftBtn' @click="addRecord()">增加记录</mt-button>
        </Header>
        <p class="planName" v-if="planName"> {{ planName }}</p>
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