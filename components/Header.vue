<template>
    <div>
        <mt-header fixed :title="globalMark.name">

            <div slot="left">
                <slot name="leftBtn"></slot>
            </div>
            <mt-button slot="right" @click="popupVisibleFN(true)">标签</mt-button>

        </mt-header>
        <mt-popup
                v-model="popupVisible"
                position="right">
            <marks @popupVisibleFN='popupVisibleFN'></marks>
        </mt-popup>
    </div>
</template>
<script>
    import marks from "~/components/marks"
    import {mapGetters, mapActions} from 'vuex'
    import Vue from 'vue'
    export default {
        computed: {
            ...mapGetters({
                markMenu: 'getMarkMenu',
                marks: 'getMarks',
                currentMark: 'getCurrentMark',
                globalMark: 'getGlobalMark'
            })
        },
        components: {
            marks
        },
        data(){
            return {
                popupVisible: false,
                recordVisible:true
            }
        },
        methods: {
            popupVisibleFN(flag){
                this.popupVisible = flag
            },
        },
        watch: {},
        mounted(){
        },
        created(){

        }
    }
</script>