import axios from 'axios'
import moment from "moment-timezone";

export default {

    async creattimeentry (timeentry){
        timeentry = JSON.parse(timeentry)

        await axios.get("/user/self")
             .then(res => {
                 timeentry.userId = res.data.id

             })

         return axios.post("/timeentry/createtime",JSON.stringify(timeentry))



     },
    async getTimeentry(){
        let userId
        await axios.get("/user/self")
            .then(res => {
                userId = res.data.id

            })

        return axios.get("/timeentry/gettime/" + userId)

    },
    async updatetimeentry(timeentry){

        timeentry = JSON.parse(timeentry)

        timeentry.start= new Date(timeentry.start).toISOString()
        timeentry.end= new Date(timeentry.end).toISOString()
        timeentry.breakStart= new Date(timeentry.breakStart).toISOString()
        timeentry.breakEnd= new Date(timeentry.breakEnd).toISOString()

        await axios.get("/user/self")
            .then(res => {
                timeentry.userId = res.data.id

            })

        return axios.put("/timeentry/update/"+timeentry.userId,JSON.stringify(timeentry))


    },
     gettime(time){
        return moment(new Date(time)).tz("Europe/Berlin").format("HH:mm")
    },
     getdate (date){
        return moment(new Date(date)).tz("Europe/Berlin").format("YYYY-MM-DD")
    }



}