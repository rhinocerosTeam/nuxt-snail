<template>
    <div class="addPlanContainer">
        <mt-cell title="计划">
            <textarea name="" v-model="plan.planName" id="" cols="30" rows="4" ></textarea>
        </mt-cell>
        <mt-cell title="开始时间">
            <input type="date" v-model="plan.startDatetime">
        </mt-cell>
        <mt-cell title="结束时间">
            <input type="date" v-model="plan.endDatetime">
        </mt-cell>
       <mt-cell title="标签">
           <template v-if="isAdd">
               {{ globalMark.name }} 重新选择>
           </template>
           <template v-if="!isAdd">
               {{ getMarkName(plan.markId,plan.markKey) }} 重新选择>
           </template>

        </mt-cell>

        <mt-button type="primary" class="save" @click="save">保存</mt-button>
        <mt-button  class="save"  v-if="!isAdd" @click="returnList">返回</mt-button>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    import api from '~/api';
    import {mapActions,mapGetters} from 'vuex';
    import Utils from '~/utils/index'
    export default {
        // editType: add update
        props:['planData','editType'],
        data(){
            return {
                isAdd:this.editType == 'add',
                plan:{
                    planName:'',
                    startDatetime:'',
                    endDatetime:'',
                    markId:'',
                    markKey:''
                }
            }
        },
        computed: {
            ...mapGetters({
                marks: 'getMarks',
                markMenu:'getMarkMenu',
                globalMark:'getGlobalMark'
            })
        },
        methods:{
            getMarkName(id = '', key = ''){
                if (!this.marks) {
                    return ''
                }
                return Utils.formateMarkName(this.marks, id, key)
            },
            async save(){
                let data = {...this.plan};

                data.startDatetime = new Date(data.startDatetime).getTime()
                data.endDatetime = new Date(data.endDatetime).getTime()

                if(data._id){
                    let res = await api.updatePlan(data).catch(e => {
                        console.log(e)
                    })

                    let result = api.parse(res)

                    if(Number(res.data.code) == 200){
                        Toast('修改成功')
                    }else{
                        Toast('error'+res.msg)
                    }

                }else{
                    if(this.markMenu.length >0 ){
                        data.markId = this.markMenu[0]._id
                    }
                    if(this.globalMark){
                        data.markKey = this.globalMark.key
                    }
                    let res = await api.addPlan(data).catch(e => {
                        console.log(e)
                    })

                    if(Number(res.data.code) == 200){
                        Toast('增加成功')
                    }else{
                        Toast('error'+res.msg)
                    }


                }

                this.returnList()

            },
            returnList(){
                this.$emit('goList')
            }
        },
        mounted(){
            if(this.planData){
                let plan = this.planData
                plan.startDatetime = Utils.format(plan.startDatetime,"yyyy-MM-dd")
                plan.endDatetime = Utils.format(plan.endDatetime,"yyyy-MM-dd")
                this.plan = plan
                console.log({planData:this.planData,plan:this.plan})
            }
        }
    }


</script>