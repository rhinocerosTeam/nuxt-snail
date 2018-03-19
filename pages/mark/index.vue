<template>
    <div class="marksManagerContainer">
        <Header left="back" title="编辑标签">
            <mt-button slot="rightBtn" @click="goAdd()">增加</mt-button>
        </Header>

        <ul>
            <li v-for="mark,index in markList" :key="index" v-if="mark">
                <left-slider width="300" :key="index">
                    <div slot="moveSlot" class="content">{{ mark.name }}</div>
                    <div slot='editSlot' class="move-buttons">
                        <div class="stickIcon">置顶</div>
                        <div class="updateIcon" @click="goUpdate(mark._id)">编辑</div>
                        <div class="deleteIcon" @click="deleteItem(mark,index)">删除</div>
                    </div>
                </left-slider>
            </li>
        </ul>

        <mt-popup
                v-model="editPopupVisible"
                position="bottom"
                class="editMarkPP"
        >
            <ul>

                <li>
                    <input placeholder="请输入标签名称" v-model="name">
                </li>

                <li>
                    <mt-button type="primary" @click="save()">保存</mt-button>
                </li>
            </ul>
        </mt-popup>


    </div>

</template>
<script>

    import LeftSlider from '../../components/tool/leftSlider.vue';
    import api from '../../api'
    import {mapGetters, mapActions} from 'vuex'
    import Header from '~/components/Header'
    import {Toast} from 'mint-ui'
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
                editPopupVisible: false,
                name: ''
            }
        },
        methods: {
            async getMarks(){
                if (this.getAccount) {
                    let userid = this.getAccount._id
                    let data = await api.getMarkList(userid).catch(e=> {
                        console.log('标签获得失败')
                    })
                    data = api.parse(data)
                    this.markList = data
                }
            },
            goUpdate(id){
                this.$router.push({path: '/mark/updateMark', query: {id}})
            },
            // 删除
            async deleteItem(mark, index) {
                console.log('删除的索引为index', index)

                await api.deleteMarks(mark._id).catch(e => {
                    console.log('标签获得失败')
                })

                this.markList.splice(index,1,0)

                Toast('删除成功')


            },
            goAdd(){
                this.editPopupVisible = true
            },
            async save(){

                if (!this.getAccount) {
                    return
                }

                let mark = {
                    userid: this.getAccount._id,
                    name: this.name,
                    key: Date.now()
                }
                await api.addMarks(mark).catch(e=> {
                    console.log('标签获得失败')
                })

                this.editPopupVisible = false
                this.name = ''

                Toast('保存成功')
                this.getMarks()

            }


        },
        mounted() {
            this.getMarks()
        }
    }

</script>
<style>

</style>