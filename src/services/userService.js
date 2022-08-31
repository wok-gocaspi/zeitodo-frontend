import axios from 'axios'







export default{

    data: ()=>({
        tempUserName:"",
        tempUserId:"",
        getUserErr:"",
        token:"",
        testName:"Peter",
        testPwd:"234",
        userInfo:{}
    }),

    getLoggedinUser(username, password){
        let UserPayload = {"username": username, "password": password}
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
      await axios.get("/user/" + "630773229d68f010d913de28").then(user => this.userInfo = user)
      console.log(this.userInfo)
      return this.token
    },

    async getService(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token.token}`;
        await axios.get("/user/" + "630773229d68f010d913de28").then(user => this.userInfo = user)
        console.log(this.userInfo)
    }


}