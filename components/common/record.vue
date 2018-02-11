<template>
    <div>
        <ul >
            <li v-for="record,index in recordList" :key="index">
                {{record.content}}
                <div class="date">
                    {{ formateDate(record.start_time) }} ~ {{ formateDate(record.end_time) }} 完成：{{record.persent}}%
                </div>
                <div class="eidtBox">
                    <img src="../../assets/img/icon/delete.png" class="delete" @click="deletePlan(index,plan._id)">
                </div>
            </li>
        </ul>

        <mt-button type="primary" class="save">新增</mt-button>
        <mt-button  class="save" @click="returnList">返回</mt-button>


        <div class="addRecordBox">
            <div >
                <mt-cell title="计划">
                    <textarea name="" v-model="plan.planName" id="" cols="30" rows="4" ></textarea>
                </mt-cell>
                <div class="start">开始</div>
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
        props:['plan','goList'],
        async asyncData({isServer, store}){

        },
        components: {

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


            }
        },
        methods: {
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
                return Utils.format(date, "yyyy-MM-dd")
            },
            save(){

            },
            async deleteRecord(index, id){
                let a = await api.deleteRecord(id).catch(e => {
                    console.log(e)
                })

                this.recordList.splice(index,1)
                Toast('删除成功')

            },
            returnList(){
                this.$emit('goList')
            }


        },
        created(){

        },
        mounted(){
            this.getRecordList(this.plan._id)
        }

    }


</script>