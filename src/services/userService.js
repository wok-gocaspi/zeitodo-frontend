import axios from 'axios'







export default{

    getLoggedinUser(username, password){
        return new Promise((res,rej)=>{
            let UserPayload = {username: username, password: password}
            axios.post("/login",JSON.stringify(UserPayload))
                .then(response => res(response.data) )
                .catch(error => rej(error))
        })

    }
}