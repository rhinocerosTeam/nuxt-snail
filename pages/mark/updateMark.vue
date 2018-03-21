<template>
    <div class="marksEditContainer">
        <Header left="back" title="编辑标签">
            <div slot="rightBtn">
                <mt-button slot="right" @click="save()">保存</mt-button>
            </div>
        </Header>
        <div>
            <ul>
                <mark-node :mark="mark" mindex='' @updateMark="updateMark" :key='mark.key'></mark-node>
            </ul>
        </div>
        <mt-popup
                v-model="popupVisible"
                position="bottom"
                class="editPopup"
        >
            <ul>

                <li>
                    <mt-button @click="goAddM()">增加</mt-button>
                </li>
                <li>
                    <mt-button type="primary" @click="goUpdateM()">编辑</mt-button>
                </li>
                <li>
                    <mt-button type="danger" @click="goDeleteM()">删除</mt-button>
                </li>
            </ul>
        </mt-popup>

        <mt-popup
                v-model="editPopupVisible"
                position="bottom"
                class="editMarkPP"
        >
            <ul>

                <li>
                    <input placeholder="请输入标签名称" v-model="editMark.name">
                </li>

                <li>
                    <mt-button type="primary" @click="updateMData()">保存</mt-button>
                </li>
            </ul>
        </mt-popup>


    </div>

</template>


<script>

    import markNode from "~/components/common/markNode"
    import LeftSlider from '../../components/tool/leftSlider.vue';
    import api from '../../api'
    import {mapGetters, mapActions} from 'vuex'
    import Header from '~/components/Header'
    import {Toast} from 'mint-ui'
    export default {
        name: 'updateMark',
        components: {
            LeftSlider,
            Header,
            markNode
        },
        computed: {
            ...mapGetters({
                getAccount: 'getAccount'
            })
        },
        data() {
            return {
                markList: [],
                mark: {
                    name: ''
                },
                markId: '',
                popupVisible: false,
                editMark: {
                    name: '',
                    key: '',
                    child: []
                },
                editPopupVisible: false,
                selectMark: {},
                selectMarkIndex: 0,
                selectParentMark: {},
            }
        },
        methods: {
            async getMarks(){
                if (this.getAccount) {
                    let userid = this.getAccount._id
                    let data = await api.getMarkList(userid).catch(e => {
                        console.log('标签获得失败')
                    })
                    data = api.parse(data)

                    this.markList = data
                }
            },

            setChild(data){

                if (data.child) {
                    for (let obj of data.child) {
                        this.setChild(obj)
                    }
                } else {
                    data.child = []
                }
            },


            async save(){
                let data = this.mark
                let child = JSON.stringify(data.child)
                data.child = child
                console.log('----->',data)
                await api.updateMarks(data).catch(e => {
                    console.log('标签获得失败')
                })
                Toast('保存成功')
            },
            // 删除
            deleteItem(index) {
                console.log('删除的索引为index', index)
            },
            findMark(callback){
                let obj = {}

                callback(obj)
            },
            updateMark(data){
                console.log(data)
                this.popupVisible = true
                this.selectMark = data.mark
                this.selectMarkIndex = data.index
                this.selectParentMark = data.parentMark
            },
            goAddM(){
                this.popupVisible = false;
                this.editPopupVisible = true;
            },
            goUpdateM(){
                this.editMark = this.selectMark;
                this.popupVisible = false;
                this.editPopupVisible = true;
            },
            goDeleteM(){
                this.selectParentMark.splice(this.selectMarkIndex, 1, 0)
                this.popupVisible = false
            },
            updateMData(){
                if (this.editMark.key) {
                    this.selectMark = this.editMark
                } else {
                    this.editMark.key = Date.now()
                    if (!this.selectMark.child) {
                        this.selectMark.child = []
                    }
                    this.selectMark.child.push(this.editMark)
                }
                this.editMark = {
                    name: '',
                    key: '',
                    child: []

                }
                this.editPopupVisible = false
            }
        },
        async mounted() {

            this.markId = this.$route.query.id

            await this.getMarks()
            if (this.markList) {
                let data = this.markList.find(obj => {
                    return obj._id == this.markId
                })

                this.setChild(data)
                this.mark = data

                console.log('-------------->', data)
            }

        }
    }

</script>
<style>

</style>