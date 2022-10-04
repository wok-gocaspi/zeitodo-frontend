import {defineStore} from 'pinia'
import userService from "@/services/userService";
import axios from "axios";
import router from '../router'

export const useUserStore = defineStore('user', {
    state: () => ({user: "", error: ""}),
    getters: {
        isError: (state) => {
            return Boolean(state.error)
        },
        isLoggedIn: (state) => {
            return Boolean(state.user)
        },
        isAdmin: (state) => {
            return Boolean(state.user.group === "admin")
        }
    },
    actions: {
        async loginUser(username, pass){

            await userService.getLoggedinUser(username, pass)
                .then(async res => {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
                    localStorage.setItem("token", res.data.token)
                    await userService.getSelf()
                        .then(res => {
                            this.error = ""
                            this.user = res.data
                            router.push("/")
                        })
                        .catch(err => {
                            this.error = err
                        })
                })
                .catch(err => {
                    this.error = err
                })

        },
        async logoutUser(){
            this.user = ""
            this.error = ""
            axios.defaults.headers.common['Authorization'] = ""
            await router.push('/login')
        },
        async renewToken(){
            await userService.refreshUserToken()
                .then(res => {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
                })
                .catch(() => {
                    this.user = ""
                    this.error = ""
                    router.push("/login")
                })
        },
        async updateUserInfo(){
            await userService.getSelf()
                .then(res => {
                    this.user = res.data
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },

})