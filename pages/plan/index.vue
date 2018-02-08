<template>
    <section class="plan-container">

        <ul>
            <li v-for="plan in planList">
                {{ plan.planName }}
                <div class="date">
                    {{ plan.startDatetime }} ~ {{ plan.endDatetime }}
                    <span>
                        {{ getMarkName(plan.markId,plan.markKey) }}
                    </span>
                </div>

            </li>
        </ul>

    </section>
</template>
<script>
    import api from '~/api'
    import Utils from '~/utils/index'
    import BookList from '~/components/books/BookList.vue';
    import category from '~/components/common/Category'
    import {mapGetters, mapActions} from 'vuex'


    export default {
        async asyncData({isServer,store}){
            let res = await api.getPlanList({markId:'5a6c23e712741b08df29ebb0',markKey:'12'}).catch(e => {
                console.log(e)
            })
            let data = api.parse(res)
            if(data){
                return {
                    planList:data
                }
            }
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
                planList:[]

            }
        },
        methods:{
            getMarkName(id,key){
                return Utils.formateMarkName(this.marks,id,key)
            }
        }

    }
</script>
<style scoped>

</style>