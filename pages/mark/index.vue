<template>
    <div>

    </div>
</template>
<script>
    import Mint from 'mint-ui';
    export default {
        data() {
            return {

            }
        },
        methods: {},
        head() {
            return {
                title: '标签列表'
            }
        },
        created(){

        },
        mounted(){
            Mint.Toast('你好nuihaonihaohsdjfisdfj')
        }
    }
</script>
<style scoped>
    .goTop {
        background: rgba(70, 163, 255, .9);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }

    .title {
        margin: 30px 0;
    }

    .users {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .user {
        margin: 10px 0;
    }
</style>