<template>
    <div class="marksContainer">
        <div class="header">MARKS
        <span class="update" v-if="!isEdit" @click="update()"></span>
        <span class="save" v-if="isEdit"></span>
        </div>
        <div class="box">
            <div class="menu">
                <span v-for="m,index in markMenu" @click="changeMenu(index)"> {{ m.name}} {{ index==markMenu.length-1?'':'>' }} </span>
            </div>
            <ul>
                <li v-for="obj,pindex in currentMark" @click.stop="goDetail(obj,pindex)" :key="pindex">
                    <div v-if="isEdit">
                        <mt-field  placeholder="请输入标签" v-model="obj.name"></mt-field>
                    </div>
                    <div v-else>
                        {{obj.name}}
                    </div>
                </li>
            </ul>
            <div>增加</div>
        </div>
    </div>
</template>
<script>
    import "~/assets/css/mark/mark.scss"
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data(){
            return {
                isEdit:false
            }
        },
        computed: {
            ...mapGetters({
                markMenu: 'getMarkMenu',
                marks: 'getMarks',
                currentMark:'getCurrentMark'
            })
        },
        methods:{
            ...mapActions({
                updateMarkMenu:'updateMarkMenu',
                initMark:'initMark'
            }),
            update(){
                this.isEdit = true
            },
            goDetail(obj,index){
                if(obj.child){
                    this.updateMarkMenu({...obj,index})
                }
            },
            changeMenu(mindex){
                if(mindex >=0 ){
                    this.updateMarkMenu({mindex})
                }
            }
        },
        created(){
            this.initMark()

        },
        mounted(){
        },

    }
</script>