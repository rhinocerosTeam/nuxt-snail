<template>
    <div>
        <ul class="planList" v-show="!editPlan._id && !recordPlan._id">
            <li v-for="plan,index in planList" :key="index"  class="clearfix">

                <left-slider width="300">
                    <div slot="moveSlot" class="move-content" @click="goRecord(plan,index)">

                        <p>
                            <img src="../../assets/img/icon/noselect.png" class="delete" v-if="plan.result == 0"
                                  @click.stop="changeResult(index,1)">
                            <img src="../../assets/img/icon/select.png" class="delete" v-if="plan.result == 1"
                                 @click.stop="changeResult(index,0)">
                            {{ plan.planName }}
                        </p>

                        <div class="bar">
                            <mt-progress :value="planTimePersent(plan.startDatetime,plan.endDatetime)" class="planProgress">
                            </mt-progress>
                            <mt-progress :value="plan.percent" class="factProgress">
                            </mt-progress>
                            <div class="runningmen" :style="{right:(100-plan.percent)+'%'}">

                                <div :class=""></div>
                            </div>
                        </div>


                        <div class="date eidtBox flex">
                            <span v-if="plan" class="mark">
                                {{ getMarkName(plan.markId,plan.markKey)||'变得更好' }}
                            </span>
                            <div>
                                {{ formateDate(plan.startDatetime,plan.endDatetime)}}
                            </div>

                            <div class="progress">
                                <span>完成 {{ plan.percent}}% </span>奋斗{{formateDatetime(plan.manHour)}}
                            </div>
                        </div>

                    </div>
                    <div slot='editSlot' class="move-buttons ">
                        <div class="stickIcon">置顶</div>
                        <div class="updateIcon" @click="updatePlan(index)">编辑</div>
                        <div class="deleteIcon" @click="deletePlan(index,plan._id)">删除</div>
                    </div>
                </left-slider>

            </li>
        </ul>
        <div class="updateCont" v-if="editPlan._id">
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
    import LeftSlider from '~/components/tool/leftSlider.vue';
    import Monent from 'moment'

    export default {
        props: ['type'],
        async asyncData({isServer, store}){

        },
        components: {
            plan,
            addPlan,
            record,
            LeftSlider
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
            getImgSrc(){
              return   'imgICON-'+parseInt(Math.random()*20)
            },
            async getProblemList(){
                let params = {
//                    markId: '',
//                    markKey: '',
                    type: this.type
                }

                if (this.globalMark) {
                    params.markKey = this.globalMark.key
                    params.markId = this.globalMark._id
                }
                if (this.markMenu.length > 0) {
                    params.markId = this.markMenu[0]._id
                }
                let res = await api.getPlanList(params).catch(e => {
                    console.log(e)
                })
                let data = api.parse(res)
                if (data) {
                    this.planList = data
                }
            },
            async changeResult(index, result){
                this.planList[index].result = result

                await api.updatePlan(this.planList[index]).catch(e => {
                    console.log(e)
                })
            },
            planTimePersent(start,end){
                start = parseInt(start)
                end = parseInt(end)
                let allDays = (end - start)
                let today = Date.now()
                let toTodayDays = (today - start)
                let persent =  parseInt(toTodayDays/allDays*100)

                if(persent<0 || today < start){
                    return 0
                }else if(persent>100 || today > end){
                    return 100
                }else{
                    return persent
                }

            },
            formateDatetime(time){
                let unit = 1000*60
                let minu = parseInt(time/unit)
                if(minu>60){
                    return  (minu/60).toFixed(1) +'小时'
                }
                return minu+'分钟'

            },
            goRecord(plan, index){
                this.$router.push({path: '/record', query: {planId: plan._id,startDatetime:plan.startDatetime,endDatetime:plan.endDatetime,planName:plan.planName}})

                // this.recordPlan = this.planList[index]
            },
            getMarkName(id = '', key = ''){
                if (!this.marks) {
                    return ''
                }
                return Utils.formateMarkName(this.marks, id, key)
            },

            formateDate(startDate, endDate){
                let start = Utils.format(startDate, "yyyy-MM-dd")
                let end = Utils.format(endDate, "yyyy-MM-dd")
                let now = Utils.format(Date.now(), "yyyy-MM-dd")
                if (start.substr(0, 4) == end.substr(0, 4)) {
                    end = end.replace(start.substring(0, 5), '')
                    if (start.substr(5, 2) == end.substr(0, 2)) {
                        end = end.replace(end.substr(0, 3), '')
                    }
                }
                if (start.substr(0, 4) == now.substr(0, 4)) {
                    start = start.substr(5)
                }
                return start + ' ~ ' + end
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