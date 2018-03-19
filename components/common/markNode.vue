<template>
    <li :key="mindex">
        <div class="name" :data-index="mindex" @click.stop="updateMark()">
            |- {{ mark.name }}
        </div>
        <ul v-if="mark.child">
            <mark-node v-for="obj,index in mark.child" :mark="obj" :mindex="mindex+'-'+index" :key="mark.key+index" @updateMark="updateMark"></mark-node>
        </ul>
    </li>
</template>
<script>
    import markNode from "~/components/common/markNode"
    export default {
        props:['mark','mindex'],
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
                if(data){
                    this.$emit('updateMark',data)
                }else{
                    this.$emit('updateMark',{mark:this.mark,index:this.mindex})
                }
            }
        },
        async mounted() {


        },
        beforeCreate: function () {
            this.$options.components.markNode = require('~/components/common/markNode').default
        }
    }
</script>