<template>
    <div>
        <mt-header fixed :title="right?globalMark.name:title">
            <div slot="left">
                <template v-if="left == 'back'">
                    <mt-button icon="back" @click="returnPage()"></mt-button>
                </template>
                <template v-else>
                    <slot name="leftBtn"></slot>
                </template>
            </div>

            <div slot="right" >
                <template v-if="right == 'mark'">
                    <mt-button @click="popupVisibleFN(true)">标签</mt-button>
                </template>
                <template v-else>
                    <slot name="rightBtn"></slot>
                </template>
            </div>
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
        props: ['left','right','title'],
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
                recordVisible: true
            }
        },
        methods: {
            popupVisibleFN(flag){
                this.popupVisible = flag
            },
            returnPage(){
                this.$router.back(-1)
            }
        },
        watch: {},
        mounted(){
        },
        created(){

        }
    }
</script>