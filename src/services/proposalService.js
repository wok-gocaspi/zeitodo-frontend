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
        var monthName
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
    }
}