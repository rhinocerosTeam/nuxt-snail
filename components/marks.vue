<template>
    <div class="marksContainer">
        <div class="header">MARKS
            <span class="update" v-if="!isEdit" @click="update()"></span>
            <span class="save" v-if="isEdit"></span>
        </div>
        <div class="box">
            <div class="menu">
                <span @click="changeMenu(-1)">全部</span>
                <span v-for="m,index in markMenu" @click="changeMenu(index)"> > {{ m.name}}  </span>
            </div>
            <ul>
                <li @click="noChoose()">
                    不选择
                </li>
                <li v-for="obj,pindex in currentMark||[]" :key="pindex" @click="choose(obj,pindex)">
                    <div v-if="isEdit">
                        <mt-field placeholder="请输入标签" v-model="obj.name"></mt-field>
                    </div>
                    <div v-else>
                        {{obj.name}}
                    </div>
                    <span class="more" v-if="obj.child&&obj.child.length>0&&!isEdit"
                          @click.stop="gotoDetail(obj,pindex)"></span>
                </li>
            </ul>
            <!--<div>增加</div>-->
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        props: ['popupVisibleFN'],
        data(){
            return {
                isEdit: false
            }
        },
        computed: {
            ...mapGetters({
                markMenu: 'getMarkMenu',
                marks: 'getMarks',
                currentMark: 'getCurrentMark',
                getGlobalMark: 'getGlobalMark'
            })
        },
        methods: {
            ...mapActions({
                updateMarkMenu: 'updateMarkMenu',
                updateGlobalMark: 'updateGlobalMark',
                initMark: 'initMark'
            }),
            update(){
                this.$router.push({path: '/mark'})
            },
            gotoDetail(obj, index){
                if (obj.child) {
                    this.updateMarkMenu({...obj, index})
                }
            },
            changeMenu(mindex){
                this.updateMarkMenu({mindex})
            },
            choose(obj, index){

                this.updateGlobalMark(obj)
                this.$emit('popupVisibleFN', false)
            },
            noChoose(){
                this.updateGlobalMark({})
                // this.clearMarkMenu()
                this.$emit('popupVisibleFN', false)
            }
        },
        created(){
            this.initMark()
        },
        mounted(){
        },

    }
</script>