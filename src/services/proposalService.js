import axios from "axios"

export default {
    getProposalsByUserID(userid){
        return axios.get("/proposals/" + userid)
    },
    createProposal(proposal){
        proposal = JSON.parse(proposal)
        if (Date.parse(proposal.startDate) > Date.parse(proposal.endDate)){
            let sDate = proposal.startDate
            proposal.startDate = this.MDTime2ZTime(proposal.endDate)
            proposal.endDate = this.MDTime2ZTime(sDate)
        } else {
            proposal.startDate = this.MDTime2ZTime(proposal.startDate)
            proposal.endDate = this.MDTime2ZTime(proposal.endDate)
        }

        let proposalArray = []
        proposalArray.push(proposal)
        return axios.post('/proposals/' + proposal.userid, JSON.stringify(proposalArray))
    },
    deleteProposal(proposal){
        proposal = JSON.parse(proposal)
        return axios.delete("/proposals/" + proposal.userId, {params: {date: proposal.startDate}})
    },
    MDTime2ZTime(mdtime){
        mdtime = mdtime.split("-")
        const month = mdtime[1]
        let monthName
        switch (month) {
            case '01':
                monthName = 'Jan'
                break
            case '02':
                monthName = 'Feb'
                break
            case '03':
                monthName = 'Mar'
                break
            case '04':
                monthName = 'Apr'
                break
            case '05':
                monthName = 'May'
                break
            case '06':
                monthName = 'Jun'
                break
            case '07':
                monthName = 'Jul'
                break
            case '08':
                monthName = 'Aug'
                break
            case '09':
                monthName = 'Sep'
                break
            case '10':
                monthName = 'Oct'
                break
            case '11':
                monthName = 'Nov'
                break
            case '12':
                monthName = 'Dec'
                break
        }
        return `${mdtime[0]}-${monthName}-${mdtime[2]}`
    },
    getAllProposals(filter){
        return new Promise((resolve, reject) => {
            let typeDict = {
                "Alle": "all",
                "Urlaub": "vacation",
                "Krank": "sickness"
            }
            let kindDict = {
                "Alle": "all",
                "Ausstehend": "pending",
                "Genehmigt": "approved",
                "Abgelehnt": "denied"
            }
            let sortDict = {
                "Neu zu Alt": "descending",
                "Alt zu Neu": "ascending"
            }
            let selectedType = typeDict[filter.selectedType]
            let selectedKinds = kindDict[filter.selectedKinds]
            let selectedOrder = sortDict[filter.selectedOrder]


            axios.get("/proposals")
                .then(res => {
                    let proposalResponse = res.data
                    let proposals = []
                    proposalResponse.forEach((proposalObj) => {
                        let username = proposalObj.username
                        proposalObj.proposals.forEach((proposal) => {
                            if((proposal.type == selectedType || selectedType == "all") && (proposal.status == selectedKinds || selectedKinds == "all")){
                                console.log(proposal)
                                proposal.username = username
                                proposals.push(proposal)
                            }
                        })
                    })
                    if (proposals.length == 0){
                        reject("no proposals found. please check if any filter was set")
                    }

                    if(selectedOrder == "ascending"){
                        for (let i = 0; i < proposals.length; i++){
                            for (let j = 0; j < proposals.length - i - 1; j++){
                                if(Date.parse(proposals[j].timestamp) > Date.parse(proposals[j+1].timestamp)){
                                    [proposals[j],proposals[j+1]] = [proposals[j+1],proposals[j]]
                                }
                            }

                        }
                    }
                    if (selectedOrder == "descending"){
                        for (let i = 0; i < proposals.length; i++){
                            for (let j = 0; j < proposals.length - i - 1; j++){
                                if(Date.parse(proposals[j].timestamp) < Date.parse(proposals[j+1].timestamp)){
                                    [proposals[j],proposals[j+1]] = [proposals[j+1],proposals[j]]
                                }
                            }

                        }
                    }



                    resolve(proposals)
                })
                .catch(err => {
                    reject(err)
                })
        })

    }
}