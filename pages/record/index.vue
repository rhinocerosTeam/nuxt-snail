<template>
    <section class="container">
        <Header>
            <mt-button slot='leftBtn' @click="goAddPlan()">增加记录</mt-button>
        </Header>
        <record from='record'></record>
        <Footer></Footer>
    </section>
</template>
<script>
    import record from '~/components/common/record'
    import Header from '~/components/Header'
    import Footer from '~/components/Footer'
    export default {
        data() {
            return {

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

</style>