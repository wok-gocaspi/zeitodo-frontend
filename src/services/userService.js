import axios from 'axios'








export default{

    data: ()=>({
        tempUserName:"",
        tempUserId:"",
        getUserErr:"",
        token:"",
        testName:"Peter",
        testPwd:"234",
        userInfo:{},
        userId:"",
        error:"",
        pwd:"",
        calcTimeResp:"",
        allTimeEntries:{}
    }),

    getLoggedinUser(username, password){
        let UserPayload = {"username": username, "password": password}
        this.tempUserName = username
        this.pwd = password
        return axios.post("/login",JSON.stringify(UserPayload))

    },
    getLoggedInUserId(username){
        return axios.get("/uId/"+username)
    },

    getUserIfno(userid){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token.token}`;
        return axios.get("/user/"+userid)
    },

  async  getCompleteInfo(){

        let fName = "Peter"
      let pwd = "234"
      await  this.getLoggedinUser(fName,pwd)
          .then(data => {
              this.token = data.data
          })
          .catch(error => this.error = error)
      console.log(this.token.token)

/*
      const config = {
          headers: { Authorization: `Bearer ${this.token.token}` ,"Content-Type":"application/json" }
      };

 */


  //    axios.defaults.headers.common = {'Authorization': `Bearer ${this.token.token}`}
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token.token}`;
      await axios.get("/user/" + "63154ea8e972ed39b0c75601").then(user => this.userInfo = user.data)
      console.log("UserInfo is: ",this.userInfo)
      return this.token
    },

   async getTokenUIDService(username,password){
       let UserPayload = {"username": username, "password": password}

       await axios.post("/login",JSON.stringify(UserPayload))
           .then(response =>{this.token = response.data.token})
           .catch(error => this.error = error)

       await axios.get("/uId/" + username)
           .then(resp => this.userId = resp.data)
           .catch(error => this.error = error)

    let [token,uId]= [this.token,this.userId]
       console.log(this.token)
       return [token,uId]
    },
    async getTokenUIDServiceT(){
        let tName = this.tempUserName
        let tPwd = this.pwd
        let UserPayload = {"username": tName, "password": tPwd}

        await axios.post("/login",JSON.stringify(UserPayload))
            .then(response =>{this.token = response.data.token})
            .catch(error => this.error = error)

        await axios.get("/uId/" + tName)
            .then(resp => this.userId = resp.data)
            .catch(error => this.error = error)

        let [token,uId]= [this.token,this.userId]
        console.log(this.token)
        return [token,uId]
    },

    async getUserObject(userId){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        await axios.get("user/" + userId)
            .then(resp =>{this.userInfo = resp})
            .catch(err => this.error = err)

        let userObj = this.userInfo
        return userObj

    },

    async getProjectEffort(userId){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        await axios.get("timeentry/" + userId + "/calcul")
            .then(resp =>{this.calcTimeResp = resp.data})
            .catch(err => this.error = err)

        let time = this.calcTimeResp
        return time

    },
    getTotalTime(time){
        let sum = 0
        let efforts = Object.values(time)
        efforts.forEach(e =>{
            sum += e
        })
        return sum
    }
,
    async getAllTimeEntries(userid){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        await axios.get("/timeentry/" + userid + "/gettime")
            .then(resp =>{this.allTimeEntries = resp.data})
            .catch(err => this.error = err)
        let entries = this.allTimeEntries
        return entries
    }


}