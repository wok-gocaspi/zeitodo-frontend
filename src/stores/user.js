import {defineStore} from 'pinia'
import userService from "@/services/userService";
import axios from "axios";
import router from '../router'

export const useUserStore = defineStore('user', {
    state: () => ({user: "", error: ""}),
    getters: {
        isError: (state) => {
            if(state.error){
                return true
            }
            else {
                return false
            }
        },
        userIsSet: (state) => {
            if(state.user){
                return true
            }
            else {
                return false
            }
        }
    },
    actions: {
        async loginUser(username, pass){
            await userService.getLoggedinUser(username, pass)
                .then(async res => {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
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
            axios.defaults.headers.common['Authorization'] = `Bearer `
        }
    },

})