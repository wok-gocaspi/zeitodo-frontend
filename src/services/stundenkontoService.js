
import moment from "moment-timezone";
import proposalService from "@/services/proposalService";
import axios from "axios";

export default {


   async getAbsence (userid){
     return axios.get("/proposals/absence/"+userid)

   },
    getvacationandsickness(userid){
       return new Promise((resolve) => {
           let filterproposal ={
               vacation :[],
               sickness :[],
           }
           proposalService.getProposalsByUserID(userid)

               .then(res=> {
                   res.data.forEach((proposal)=>{
                       if (proposal.type === "vacation" && proposal.status==="approved"){
                           filterproposal.vacation.push(proposal)

                       }
                       else if (proposal.type === "sickness")  {
                           filterproposal.sickness.push(proposal)
                       }
                   })
                   resolve(filterproposal)
               })
               .catch(err => {
                   console.log(err)
               })


       })


    },


    gettime(time){
        return moment(new Date(time)).tz("Europe/Berlin").format("HH:mm")
    },
    getdate (date){
        return moment(new Date(date)).tz("Europe/Berlin").format("YYYY-MM-DD")
    }



}