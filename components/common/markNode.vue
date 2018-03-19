<template>
    <li :key="'li'+mark.key" v-if="mark">
        <div class="name"  @click.stop="updateMarkSelf()">
            |- {{ mark.name }}
        </div>
        <ul v-if="mark.child">
            <mark-node v-for="obj,index in mark.child" :mark="obj"  :mindex="index" :parentMark="mark.child" :key="mark.key+index" @updateMark="updateMark"></mark-node>
        </ul>
    </li>
</template>
<script>
    import markNode from "~/components/common/markNode"
    export default {
        props:['mark','parentMark','mindex'],
        name: 'MarkNode',
        computed: {
        },
        components: {
            markNode
        },
        data() {
            return {

            }
        },
        methods: {
            updateMark(data){
                this.$emit('updateMark',data)
            },
            updateMarkSelf(index){
                this.$emit('updateMark',{mark:this.mark,parentMark:this.parentMark,index:this.mindex})
            }
        },
        async mounted() {


        },
        beforeCreate: function () {
            this.$options.components.markNode = require('~/components/common/markNode').default
        }
    }
</script>