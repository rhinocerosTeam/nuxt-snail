<template>
    <div class="marksEditContainer">
        <ul>
            <!--<li>-->
            <!--健身-->
            <!--<div class="editBox">-->
            <!--<img src="../../assets/img/icon/eidt.png" class="update">-->
            <!--</div>-->
            <!--</li>-->
            <li>
                <left-slider width="300">
                    <p slot="moveSlot" class="content"> 健身</p>
                    <div slot='editSlot'>
                        <div class="stickIcon" @click.prevent="deleteItem(index)">置顶</div>
                        <div class="updateIcon" @click.prevent="deleteItem(index)">编辑</div>
                        <div class="deleteIcon" @click.prevent="deleteItem(index)">删除</div>
                    </div>
                </left-slider>
            </li>
            <!--<li>-->
            <!--健身-->
            <!--</li>-->
            <!--<li>-->
            <!--健身-->
            <!--</li>-->

        </ul>
    </div>

</template>
<script>

    import LeftSlider from '../../components/tool/leftSlider.vue';
    import api from '../../api'

    export default {
        name: 'MyCollect',
        components: {
            LeftSlider
        },
        data() {
            return {
                index: 10

            }
        },
        methods: {
            getMarks(){

            },
            // 删除
            deleteItem(index) {
                console.log('删除的索引为index', index)
            }
        },
        mounted() {

        }
    }

</script>
<style>
    .move {
        background-color: #00a0e9;
    }
</style>