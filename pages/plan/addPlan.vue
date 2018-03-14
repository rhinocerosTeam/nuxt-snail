<template>
    <div>
        <Header>
            <mt-button icon="back" slot='leftBtn' @click="returnPage()"></mt-button>
        </Header>
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

            }
        }
    }

</script>