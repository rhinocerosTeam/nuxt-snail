<template>
    <div class="recordContainer">

        <ul class="recordList">
            <li v-for="record,index in recordList" :key="index">
                <div class="planInfo" v-if="record.planId&&record.planId.planName">
                    {{ record.planId.planName }}
                </div>
                {{record.content}}
                <div class="date">
                    {{ formateDatetime(record.start_time) }} ~ {{ formateDatetime(record.end_time) }}
                    完成：{{record.persent}}%
                </div>
                <div class="eidtBox">
                    <img src="../../assets/img/icon/update.png" class="update" @click.stop="updatePlan(index)">
                    <img src="../../assets/img/icon/delete.png" class="delete" @click="deleteRecord(index,record._id)">
                </div>
            </li>
        </ul>

        <div v-if="!isFromRecord">
            <mt-button type="primary" class="save" @click="addRecord()">新增进度</mt-button>
            <mt-button class="save" @click="returnList">返回计划列表</mt-button>
        </div>

        <div class="addRecordBox" v-show="showRecord">
            <div>
                <div v-if="plan">
                    <mt-cell title="计划">
                        {{ plan.planName }}
                    </mt-cell>
                    <mt-cell title="计划时间">
                        {{ formateDate(plan.startDatetime) }} ~ {{ formateDate(plan.endDatetime) }}
                    </mt-cell>
                    <mt-cell title="工时">
                        {{ plan.manHour }}
                    </mt-cell>
                    <mt-cell title="完成情况">
                        {{ plan.persent }}
                    </mt-cell>
                </div>

                <mt-cell title="完成事项">
                    <textarea name="" v-model="record.content" id="" cols="30" rows="4"></textarea>
                </mt-cell>
                <mt-cell title="完成百分比">
                    <input type="text" v-model="record.persent">
                </mt-cell>
                <mt-cell title="开始时间">
                    <mt-datetime-picker
                            ref="picker_start"
                            type="datetime"
                            v-model="startTime"
                            @confirm="startPickerConfirm"
                    >
                    </mt-datetime-picker>
                    {{ formateDatetime(record.start_time)}} <span class="selectTime" @click='chooseTime(0)'> 选择时间 </span>
                </mt-cell>
                <mt-cell title="结束时间">
                    <mt-datetime-picker
                            ref="picker_end"
                            type="datetime"
                            @confirm="endPickerConfirm"
                            v-model="endTime">
                    </mt-datetime-picker>
                    {{ formateDatetime(record.end_time) }} <span class="selectTime" @click='chooseTime(1)'> 选择时间 </span>
                </mt-cell>
                <mt-button type="primary" class="save" @click="start()" v-if="!record.start_time">开始计时</mt-button>
                <div v-if="record.start_time && !record.end_time">
                    <div class="time">{{ formateTime(recordTime) }}</div>
                    <mt-button type="primary" class="save" @click="end()">结束计时</mt-button>
                </div>
                <mt-button type="primary" class="save" @click="save()" v-if="record.end_time">保存</mt-button>
                <mt-button class="save" @click="closeRecord()">关闭</mt-button>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    import api from '~/api'
    import Utils from '~/utils/index'
    import {planStatus, planType} from '~/constant/params'
    import {mapGetters, mapActions} from 'vuex'


    export default {
        props: ['plan', 'from'],
        async asyncData({isServer, store}){

        },
        components: {},
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
                isFromRecord: this.from == 'record',
                recordList: [],
                record: {
                    planId: '',
                    content: '',
                    start_time: '',
                    end_time: '',
                    persent: ''
                },
                recordTime: 0,
                timeout: '',
                showRecord: false,
                startTime: '',
                endTime: ''
            }
        },
        methods: {
            updatePlan(index){

            },
            startPickerConfirm(value){
                console.log(value)
                this.record.start_time = new Date(value).getTime()
            },
            endPickerConfirm(value){
                this.record.end_time = new Date(value).getTime()
            },
            chooseTime(type){
                if (type == 0) {
                    if(!this.startTime){
                        this.startTime = new Date()
                    }
                    this.$refs.picker_start.open();
                } else {
                    if(!this.endTime){
                        this.endTime = new Date()
                    }
                    this.$refs.picker_end.open();
                }
            },
            addRecord(){
                this.showRecord = true
            },
            async getRecordList(){

                let cond = {}
                if (this.plan && this.plan._id) {
                    cond = {planId: this.plan._id}
                }

                let res = await api.getRecordList(cond).catch(e => {
                    console.log(e)
                })
                let data = api.parse(res)
                if (data) {
                    this.recordList = data
                }
            },
            getMarkName(id, key){
                return Utils.formateMarkName(this.marks, id, key)
            },
            formateDate(date){
                if (!date) {
                    return ''
                }
                return Utils.format(date, "yyyy-MM-dd")
            },
            formateDatetime(date){
                if (!date) {
                    return ''
                }
                return Utils.format(date, "yyyy-MM-dd hh:mm:ss")
            },
            formateTime(date){
                if (!date) {
                    return ''
                }
                return Utils.format(date, "mm:ss")
            },
            async save(){
                let data = {...this.record}
                data.planId = this.plan._id
                if (!this.record.content || !this.record.persent) {
                    Toast('请输入完成事项和百分比')
                    return
                }
                let d = await api.addRecord(data).catch(e => {
                    console.log(e)
                })
                Toast('增加成功')
                this.closeRecord()
                this.getRecordList(this.plan._id)

            },
            async deleteRecord(index, id){
                let a = await api.deleteRecord(id).catch(e => {
                    console.log(e)
                })

                this.recordList.splice(index, 1)
                Toast('删除成功')

            },
            returnList(){
                this.$emit('goList')
            },
            start(){
                this.record.start_time = Date.now()
                this.timeout = setInterval(() => {
                    this.recordTime += 1000
                }, 1000)
            },
            end(){
                this.record.end_time = Date.now()
                clearInterval(this.timeout)
            },
            closeRecord(){
                this.record = {
                    planId: '',
                    content: '',
                    start_time: '',
                    end_time: '',
                    persent: ''
                };
                this.recordTime = 0;
                this.timeout = '';
                this.showRecord = false;
            }

        },
        created(){

        },
        mounted(){

            this.getRecordList()
        }

    }


</script>
<style >

</style>