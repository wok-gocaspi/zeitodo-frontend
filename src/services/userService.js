import axios from 'axios'







export default{

    getLoggedinUser(username, password){
        let UserPayload = {"username": username, "password": password}
        return axios.post("/login",JSON.stringify(UserPayload))

    },
    getAllUser(){
        return axios({
            url: "/user",
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
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

}