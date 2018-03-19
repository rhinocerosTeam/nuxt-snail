<template>
    <div class="marksManagerContainer">
        <Header left="back" title="编辑标签"></Header>

        <ul>
            <li v-for="mark,index in markList" :key="index">
                <left-slider width="300" :key="index">
                    <div slot="moveSlot" class="content">{{ mark.name }}</div>
                    <div slot='editSlot' class="move-buttons">
                        <div class="stickIcon" @click="deleteItem(index)">置顶</div>
                        <div class="updateIcon" @click="goUpdate(mark._id)">编辑</div>
                        <div class="deleteIcon" @click="deleteItem(index)">删除</div>
                    </div>
                </left-slider>
            </li>
        </ul>
    </div>

</template>
<script>

    import LeftSlider from '../../components/tool/leftSlider.vue';
    import api from '../../api'
    import {mapGetters, mapActions} from 'vuex'
    import Header from '~/components/Header'
    export default {
        name: 'MyCollect',
        components: {
            LeftSlider,
            Header
        },
        computed: {
            ...mapGetters({
                getAccount: 'getAccount'
            })
        },
        data() {
            return {
                index: 10,
                markList: [],

            }
        },
        methods: {
            async getMarks(){
                if(this.getAccount){
                    let userid = this.getAccount._id
                    let data = await api.getMarkList(userid).catch(e=> {
                        console.log('标签获得失败')
                    })
                    data = api.parse(data)
                    this.markList = data
                }
            },
            goUpdate(id){
                this.$router.push({path:'/mark/updateMark',query:{id}})
            },
            // 删除
            deleteItem(index) {
                console.log('删除的索引为index', index)
            }
        },
        mounted() {
            this.getMarks()
        }
    }

</script>
<style>

</style>