
import proposalService from "@/services/proposalService";

export default {

    async getAlluservacation(userid){

        let filterproposal ={
            teammember:[],
            vacation :[],

        }
        await proposalService.getAllProposals(userid)

            .then(res=> {
                res.data.forEach((proposal)=>{
                    if (proposal.type === "vacation" && proposal.status==="approved"){
                        filterproposal.vacation.push(proposal)

                    }
                })
            })

        return filterproposal
    },

}