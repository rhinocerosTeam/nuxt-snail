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
                <left-slider :index="index" @deleteItem="deleteItem">
                    <p slot="moveSlot"> 健身</p>
                    <div slot = 'editSlot'>
                        <div class="deleteIcon" :delWidth="200" @click.prevent="deleteItem(index)">删除</div>
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
            // 删除
            deleteItem: function (index) {
                console.log('删除的索引为index', index)
            }
        },
        mounted() {

        }
    }

</script>
<style>
    .move{
        background-color: #00a0e9;
    }
</style>