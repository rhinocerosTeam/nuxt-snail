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
            {{ globalMark.name}}
        </mt-cell>

        <mt-button type="primary" class="save" @click="save">保存</mt-button>

    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    import api from '~/api';
    import {mapActions,mapGetters} from 'vuex';

    export default {
        data(){
            return {
                plan:{
                    planName:'',
                    startDatetime:'',
                    endDatetime:'',
                }
            }
        },
        computed: {
            ...mapGetters({
                markMenu:'getMarkMenu',
                globalMark:'getGlobalMark'
            })
        },
        methods:{
            async save(){
                let data = {...this.plan};

                if(this.markMenu.length >0 ){
                    data.markId = this.markMenu[0]._id
                }
                if(this.globalMark){
                    data.markKey = this.globalMark.key
                }

                data.startDatetime = new Date(data.startDatetime).getTime()
                data.endDatetime = new Date(data.endDatetime).getTime()

                let res = await api.addPlan(data).catch(e=>{
                    console.log(e)
                })

                Toast('增加成功')

            }
        },

    }


</script>