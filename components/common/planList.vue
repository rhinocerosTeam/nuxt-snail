<template>
    <div>
        <ul>
            <li v-for="plan in planList">
                [{{ planStatus[plan.result]}}] [{{ plan.percent}}] {{ plan.planName }}
                <div class="date">
                    {{ formateDate(plan.startDatetime) }} ~ {{ formateDate(plan.endDatetime) }} 工时：{{plan.manHour}}
                    <span>
                        {{ getMarkName(plan.markId,plan.markKey) }}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>

    import api from '~/api'
    import Utils from '~/utils/index'
    import {planStatus , planType} from '~/constant/params'
    import BookList from '~/components/books/BookList.vue';
    import category from '~/components/common/Category'
    import {mapGetters, mapActions} from 'vuex'
    import plan from '~/components/common/planList'
    import addPlan from '~/components/common/addPlan'

    export default {
        async asyncData({isServer,store}){

        },
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
                planList:[],
                planStatus:planStatus

            }
        },
        methods:{
            async getProblemList(){

                let params = {
                    markId:'',
                    markKey:'',
                    type:this.type
                }

                if(this.markMenu.length >0 ){
                    params.markId = this.markMenu[0]._id
                }
                if(this.globalMark){
                    params.markKey = this.globalMark.key
                }

                let res = await api.getPlanList(params).catch(e => {
                    console.log(e)
                })
                let data = api.parse(res)
                if(data){
                    this.planList = data
                }
            },
            getMarkName(id,key){
                return Utils.formateMarkName(this.marks,id,key)
            },
            formateDate(date){
                return Utils.format(date, "yyyy-MM-dd")
            }
        },
        created(){

        },
        mounted(){
            this.getProblemList()
        },
        watch:{
            globalMark(){
                this.getProblemList()
            }
        }

    }


</script>