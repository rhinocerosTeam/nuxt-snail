<template>
    <div class="left-delete">
        <div class="move"
             @touchstart="_touchStart"
             @touchmove="_touchMove"
             @touchend="_touchEnd"
             :style="txtStyle">
            <slot name="moveSlot"></slot>
        </div>
        <div class="editIcon" :style="{width:delWidth/100+'rem'}" @click.stop="close()">
            <slot name="editSlot" ></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            width: String
        },
        data() {
            return {
                startX: 0,       //触摸位置
                moveX: 0,       //滑动时的位置
                disX: 0,       //移动距离
                txtStyle: '',
                delWidth: parseInt(this.width),
                top: '',
            }
        },
        methods: {
            _touchStart: function (ev) {
                ev = ev || event;
                if (ev.touches.length == 1) {
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                    //console.log(this.startX)
                }
            },
            _touchMove: function (ev) {
                ev = ev || event;
                if (ev.touches.length == 1) {
                    // 滑动过程中的实时位置
                    this.moveX = ev.touches[0].clientX
                    // 滑动过程中实时计算滑动距离
                    this.disX = this.startX - this.moveX;
                    // 如果是向右滑动或者只是点击，不改变滑动位置
                    if (this.disX < 100 || this.disX == 0) {
                        // console.log('没有移动');
                        this.txtStyle = "transform:translateX(0rem)";
                    } else if (this.disX > 100) {
                        // 如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
                        this.txtStyle = "transform:translateX(-" + this.disX / 100 + "rem)";
                        if (this.disX >= this.delWidth / 100) {
                            this.txtStyle = "transform:translateX(-" + this.delWidth / 100 + "rem)";
                            this.zIndex = "z-index:" + 10 + "rem";
                        }
                    }
                }
            },
            _touchEnd: function (event) {
                if (event.changedTouches.length == 1) {
                    this.startX = 0;
                    this.zIndex = "z-index:" + -1 + "rem";
                    console.log(event.changedTouches[0].clientX)
                    // 手指移动结束后的水平位置
                    let endX = event.changedTouches[0].clientX;
                    // 触摸开始与结束,手指移动的距离
                    this.disX = this.startX - endX;
                    //如果距离小于删除按钮的1/2，不显示删除按钮
                }
            },
            close(){
                this.txtStyle = "transform:translateX(0rem)";
            }
        }
    }
</script>

<style>
    .left-delete {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        background-color: #fff;
    }

    .move {
        position: relative;
        height: 100%;
        background-color: #fff;
    }

    .editIcon {
        width: 2rem;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
    }
</style>