import axios from 'axios'

export default {

    async creattimeentry (timeentry){
        timeentry = JSON.parse(timeentry)
        console.log(timeentry)
        await axios.get("/user/self")
             .then(res => {
                 timeentry.userId = res.data.id

             })
             .catch(err => {
                 console.log(err)
             })
         return axios.post("/timeentry/createtime",JSON.stringify(timeentry))



     }

}