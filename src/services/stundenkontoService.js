
import moment from "moment-timezone";
import proposalService from "@/services/proposalService";

export default {



    async getvacationandsickness(userid){
        let filterproposal ={
            vacation :[],
            sickness :[],
        }
       await proposalService.getProposalsByUserID(userid)

            .then(res=> {
                res.data.forEach((proposal)=>{
                    if (proposal.type === "vacation" && proposal.status==="approved"){
                        filterproposal.vacation.push(proposal)

                    }
                    else if (proposal.type === "sickness")  {
                        filterproposal.sickness.push(proposal)
                    }
                })
            })

        return filterproposal
    },


    gettime(time){
        return moment(new Date(time)).tz("Europe/Berlin").format("HH:mm")
    },
    getdate (date){
        return moment(new Date(date)).tz("Europe/Berlin").format("YYYY-MM-DD")
    }



}