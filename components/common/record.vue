<template>
    <div>

        <ul>
            <li v-for="record,index in recordList" :key="index">
                {{record.content}}
                <div class="date">
                    {{ formateDatetime(record.start_time) }} ~ {{ formateDatetime(record.end_time) }} 完成：{{record.persent}}%
                </div>
                <div class="eidtBox">
                    <img src="../../assets/img/icon/delete.png" class="delete" @click="deletePlan(index,plan._id)">
                </div>
            </li>
        </ul>

        <mt-button type="primary" class="save" @click="addRecord()">新增</mt-button>
        <mt-button class="save" @click="returnList">返回</mt-button>


        <div class="addRecordBox" v-show="showRecord">
            <div>
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
                <mt-cell title="完成事项">
                    <textarea name="" v-model="record.content" id="" cols="30" rows="4"></textarea>
                </mt-cell>
                <mt-cell title="完成百分比">
                    <input type="text" v-model="record.persent">
                </mt-cell>
                <mt-cell title="开始时间">
                    {{ formateDatetime(record.start_time) }}
                </mt-cell>
                <mt-cell title="结束时间">
                    {{ formateDatetime(record.end_time) }}
                </mt-cell>
                <mt-button type="primary" class="save" @click="start()" v-if="!record.start_time">开始计时</mt-button>
                <div v-if="record.start_time && !record.end_time">
                    <div class="time">{{ formateTime(recordTime) }}</div>
                    <mt-button type="primary" class="save" @click="end()">结束计时</mt-button>
                </div>
                <mt-button type="primary" class="save" @click="save()" v-if="record.end_time">保存</mt-button>
                <mt-button type="primary" class="save" @click="closeRecord()">关闭</mt-button>
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
        props: ['plan', 'goList'],
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
                showRecord: false
            }
        },
        methods: {
            addRecord(){
                this.showRecord = true
            },
            async getRecordList(planId){

                let res = await api.getRecordList({planId}).catch(e => {
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
            this.getRecordList(this.plan._id)
        }

    }


</script>