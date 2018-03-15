<template>
    <div>
        <Header back="true"></Header>
        <add-plan editType="add"></add-plan>
    </div>

</template>
<script>
    import addPlan from '~/components/common/addPlan'
    import Header from '~/components/Header'
    export default {
        components: {
            addPlan,
            Header
        },
        methods:{
            returnPage(){
                this.$router.back(-1)
            }
        }
    }

</script>