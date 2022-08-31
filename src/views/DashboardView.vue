<template>
  <v-container>
    <h1>Test</h1>
    <v-btn v-on:click="getCurrentUId()">Get user Id of Peter</v-btn>
    <v-btn v-on:click="getUserInfo(tempUserId)" >Get user Info</v-btn>
    <v-btn v-on:click="getToken(testName,testPwd)">get Token of Peter</v-btn>
    <v-btn v-on:click="getComplete()">get complete</v-btn>
  </v-container>

</template>

<script>
import userService from "@/services/userService";
// import axios from "axios";
export default {

  name: "DashboardView.vue",


  data: ()=>({
    tempUserName:"",
    tempUserId:"",
    getUserErr:"",
    token:"",
    testName:"Peter",
    testPwd:"234"
  }),

  methods:{
   async getCurrentUId(){
     await userService.getLoggedInUserId("Peter")
         .then(data => this.tempUserId = data.data)
         .catch(error => this.getUserErr = error)

     console.log(this.tempUserId)
    },

    async getUserInfo(userId){
 //    let token = this.token.token
//      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
     await userService.getUserIfno(userId)
         .then(data => console.log(data.data))
         .catch(error => console.log(error))
    },
    async getToken(username,password){
      await  userService.getLoggedinUser(username,password)
          .then(data => {
            this.token = data.data
          })
          .catch(error => this.error = error)
      console.log(this.token.token)
    },

   async getComplete(){
     await userService.getCompleteInfo().then(data => console.log(data))
    }
  }
}
</script>