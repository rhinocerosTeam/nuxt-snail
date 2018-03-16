<template>
    <div class="recordContainer">
        <!-- 进度列表 -->
        <ul class="recordList">
            <li v-for="record,index in recordList" :key="index">
                <left-slider width="200" >

                    <div slot="moveSlot" class="move-content">
                        {{record.content}}
                        <div class="date">
                            {{ getPostTime(record.start_time)}}
                            <span>{{record.persent}}%</span> {{(record.end_time - record.start_time)/1000/60}}分钟
                            <!--<div class="eidtBox">
                                <img src="../../assets/img/icon/update.png" class="update"
                                     @click.stop="toUpdateRecord(index)">
                                <img src="../../assets/img/icon/delete.png" class="delete"
                                     @click.stop="deleteRecord(index,record._id)">
                            </div>-->
                        </div>

                        <div class="planInfo" v-if="record.planId&&record.planId.planName">
                            <span>{{ getMarkName(record.planId.markId,record.planId.markKey)}}</span>
                            {{record.planId.planName}}
                        </div>
                    </div>
                    <div slot='editSlot' class="move-buttons ">
                        <div class="updateIcon updateIcon50" @click.stop="toUpdateRecord(index)">编辑</div>
                        <div class="deleteIcon deleteIcon50" @click.stop="deleteRecord(index,record._id)">删除</div>
                    </div>
                </left-slider>
            </li>
        </ul>
        <!-- 增加进度 -->
        <div class="addRecordBox" v-show="showRecord">
            <div>

                <mt-cell title="完成事项">
                    <textarea v-model="record.content" id="" cols="30" rows="4"></textarea>
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
                    <span class="selectTime"
                          @click='chooseTime(0)'>{{ formateDatetime(record.start_time)||'选择时间'}}   </span>
                </mt-cell>
                <mt-cell title="结束时间">
                    <mt-datetime-picker
                            ref="picker_end"
                            type="datetime"
                            @confirm="endPickerConfirm"
                            v-model="endTime">
                    </mt-datetime-picker>
                    <span class="selectTime"
                          @click='chooseTime(1)'>{{ formateDatetime(record.end_time)||'选择时间' }}   </span>
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
    import LeftSlider from '~/components/tool/leftSlider.vue'

    export default {
        props: ['planId', 'from'],
        async asyncData({isServer, store}){

        },
        components: {
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
            getMarkName(id = '', key = ''){
                if (!this.marks) {
                    return ''
                }
                return Utils.formateMarkName(this.marks, id, key)
            },
            toUpdateRecord(index){
                this.showRecord = true
                this.record = this.recordList[index]
            },
            startPickerConfirm(value){
                this.record.start_time = new Date(value).getTime()
            },
            endPickerConfirm(value){
                this.record.end_time = new Date(value).getTime()
            },
            chooseTime(type){
                if (type == 0) {
                    if (!this.startTime) {
                        this.startTime = new Date()
                    }
                    this.$refs.picker_start.open();
                } else {
                    if (!this.endTime) {
                        this.endTime = new Date()
                    }
                    this.$refs.picker_end.open();
                }
            },
            addRecord(){
                this.record = {
                    planId: '',
                    content: '',
                    start_time: '',
                    end_time: '',
                    persent: ''
                },
                        this.showRecord = true
            },
            async getRecordList(){

                let cond = {}
                if (this.planId) {
                    cond = {planId: this.planId}
                }

                let res = await api.getRecordList(cond).catch(e => {
                    console.log(e)
                })
                let data = api.parse(res)
                if (data) {
                    this.recordList = data
                }
            },
            getPostTime(date){
                return Utils.getPostTime(date)
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

                if (this.record._id) {
                    if (this.planId) {
                        data.planId = this.planId
                    } else {
                        data.planId = this.record.planId._id
                    }
                    if (!this.record.content || !this.record.persent) {
                        Toast('请输入完成事项和百分比')
                        return
                    }
                    let d = await api.updateRecord(data).catch(e => {
                        console.log(e)
                    })
                    Toast('修改成功')
                } else {
                    data.planId = this.planId
                    if (!this.record.content || !this.record.persent) {
                        Toast('请输入完成事项和百分比')
                        return
                    }
                    let d = await api.addRecord(data).catch(e => {
                        console.log(e)
                    })
                    Toast('增加成功')
                }


                this.closeRecord()
                this.getRecordList(data.planId)

            },
            async deleteRecord(index, id){
                let a = await api.deleteRecord(id).catch(e => {
                    console.log(e)
                })

                this.recordList.splice(index, 1)
                Toast('删除成功')

            },
            returnList(){
                this.$router.back(-1)
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
<style>

</style>