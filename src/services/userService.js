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
    getAllUser(){
        return axios.get("/user")
    },
    deleteUser(userid){
        return axios.delete("/user/" + userid)
    },
    getUserByID(userid){
        return axios.get("/user/" + userid)
    },
    updateUser(userBody){
        return axios.patch("/user", JSON.stringify(userBody))
    },
     getProjectEffort1(userId){
        //    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
        //    await axios.get("timeentry/" + userId + "/calcul")
       return axios.get("/timeentry/calcul/" + userId )

    },
    getTotalTime(time){
        let sum = 0
        let efforts = Object.values(time)
        efforts.forEach(e =>{
            sum += e
        })
        return sum
    },
     getAllTimeEntries2(userid){
       return  axios.get("/timeentry/gettime/" + userid )
    },

    async getSelf(){
  //      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
        return axios.get("/user/self")

    }


}