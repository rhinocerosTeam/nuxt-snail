<template>
    <section class="container loginContainer">

        <div class="circle grade grade1">
        </div>
        <div class="gradeDesc">
            潜龙卧虎
        </div>

        <div class="user" v-if="getAccount">
            <div class="text">
                {{getAccount&&getAccount.username}}
            </div>
            <div  class="text" @click="logout()">
                注销
            </div>
        </div>

        <div class="dialog" v-if="!getAccount">
            <div class="text">
                <span @click="isLogin = true">登录</span> / <span @click="isLogin = false">注册</span>
            </div>
            <mt-field label="username" placeholder="输入用户名" v-model="user.username"></mt-field>
            <mt-field label="password" placeholder="输入密码" type="password" v-model="user.password"></mt-field>
            <mt-button type="primary" @click="save()">{{isLogin?'登录':'注册'}}</mt-button>
        </div>

        <Footer></Footer>
    </section>
</template>
<script>
    import {Toast} from 'mint-ui'
    import api from '~/api'
    import Footer from '~/components/Footer'
    import {mapActions, mapGetters} from 'vuex'
    export default {
        components: {
            Footer
        },
        data() {
            return {
                isLogin: true,
                user: {
                    username: '',
                    password: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                getAccount: 'getAccount'
            })
        },
        methods: {
            ...mapActions({
                setAccount: 'setAccount'
            }),
            async save(){
                let data = null
                if (!this.user.username || !this.user.password) {
                    Toast('请输入正确的用户名和密码')
                }

                if (this.isLogin) {
                    data = await api.login(this.user).catch(e => {
                        console.log(e)
                    })
                } else {
                    data = await api.register(this.user).catch(e => {
                        console.log(e)
                    })
                }
                data = api.parse(data)
                this.setAccount(data)


            },
            async logout(){
                await  api.logout().catch(e => {
                    console.log(e)
                })
                this.setAccount(null)
                console.log(this.getAccount)

            }
        },
        created(){
            console.log('created', this.getAccount)
        }
    }
</script>
<style scoped>

</style>