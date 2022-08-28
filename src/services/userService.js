import axios from 'axios'







export default{

    getLoggedinUser(username, password){
        let UserPayload = {"username": username, "password": password}
        return axios.post("/login",JSON.stringify(UserPayload))

    },

    showLoggedName (){
        return axios.get("/uId/Peter")
    }
}