<template>
    <section class="plan-container">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">进行中</mt-tab-item>
            <mt-tab-item id="">增加</mt-tab-item>
            <mt-tab-item id="3">未开始</mt-tab-item>
            <mt-tab-item id="4">已完成</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <plan :type="all"></plan>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <plan :type="0"></plan>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <plan :type="1"></plan>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <plan :type="-1"></plan>
            </mt-tab-container-item>
        </mt-tab-container>


    </section>
</template>
<script>
    import api from '~/api'
    import Utils from '~/utils/index'
    import {planStatus} from '~/constant/params'
    import BookList from '~/components/books/BookList.vue';
    import category from '~/components/common/Category'
    import {mapGetters, mapActions} from 'vuex'
    import plan from '~/components/common/planList'

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
        components:{
            plan
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
                selected:1,
                planList:[],
                planStatus:planStatus

            }
        },
        methods:{
            getMarkName(id,key){
                return Utils.formateMarkName(this.marks,id,key)
            },
            formateDate(date){
                return Utils.format(date, "yyyy-MM-dd")
            }
        }

    }
</script>
<style scoped>

</style>