<template>
    <div>
        <ul v-show="!editPlan._id && !recordPlan._id">
            <li v-for="plan,index in planList" :key="index" @click="goRecord(index)">
                [{{ plan.percent}} %]
                {{ plan.planName }}
                <div class="date">
                    {{ formateDate(plan.startDatetime) }} ~ {{ formateDate(plan.endDatetime) }} 工时：{{plan.manHour/1000/60}}分钟
                    <span v-if="plan">
                        {{ getMarkName(plan.markId,plan.markKey) }}
                    </span>
                </div>
                <div class="eidtBox">
                    <img src="../../assets/img/icon/update.png" class="update" v-if="plan.result == 0" @click.stop="updatePlan(index)">
                    <img src="../../assets/img/icon/delete.png" class="delete" v-if="plan.result == 0" @click.stop="deletePlan(index,plan._id)">
                    <img src="../../assets/img/icon/noselect.png" class="delete" v-if="plan.result == 0" @click.stop="changeResult(index,1)">
                    <img src="../../assets/img/icon/select.png" class="delete" v-if="plan.result == 1" @click.stop="changeResult(index,0)">
                </div>
            </li>
        </ul>
        <div class="update" v-if="editPlan._id">
            <addPlan :planData="editPlan" @goList="goList" editType="update"></addPlan>
        </div>
        <div v-if='recordPlan._id'>
            <record :plan="recordPlan" @goList="goList" from='plan'></record>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    import api from '~/api'
    import Utils from '~/utils/index'
    import {planStatus, planType} from '~/constant/params'
    import {mapGetters, mapActions} from 'vuex'
    import plan from '~/components/common/planList'
    import addPlan from '~/components/common/addPlan'
    import record from '~/components/common/record'

    export default {
        props: ['type'],
        async asyncData({isServer, store}){

        },
        components: {
            plan,
            addPlan,
            record
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
                planList: [],
                planStatus: planStatus,
                editPlan: {},
                recordPlan: {}
            }
        },
        methods: {
            async getProblemList(){
                let params = {
//                    markId: '',
//                    markKey: '',
                    type: this.type
                }
                if (this.markMenu.length > 0) {
                    params.markId = this.markMenu[0]._id
                }
                if (this.globalMark) {
                    params.markKey = this.globalMark.key
                }

                let res = await api.getPlanList(params).catch(e => {
                    console.log(e)
                })
                let data = api.parse(res)
                if (data) {
                    this.planList = data
                }
            },
            async changeResult(index,result){
                this.planList[index].result = result

                await api.updatePlan(this.planList[index]).catch(e => {
                    console.log(e)
                })
            },
            goRecord(index){
                this.recordPlan = this.planList[index]
            },
            getMarkName(id = '', key = ''){
                if (!this.marks) {
                    return ''
                }
                return Utils.formateMarkName(this.marks, id, key)
            },
            formateDate(date){
                return Utils.format(date, "yyyy-MM-dd")
            },
            updatePlan(index){
                this.editPlan = this.planList[index]
            },
            async deletePlan(index, id){
                let a = await api.deletePlan(id).catch(e => {
                    console.log(e)
                })

                this.planList.splice(index, 1)
                Toast('删除成功')

            },
            goList(){
                this.editPlan = {}
                this.recordPlan = {}
                this.getProblemList()
            }


        },
        created(){

        },
        mounted(){
            this.getProblemList()
        },
        watch: {
            globalMark(){
                this.getProblemList()
            }
        }

    }


</script>