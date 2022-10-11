import axios from "axios"
import qs from "qs"

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
        let typeDict = {
            "Urlaub": "vacation",
            "Krank": "sickness"
        }
        proposal.type = typeDict[proposal.type]
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
    ZTimeToMDTime(ztime){
        ztime = ztime.split("-")
        const month = ztime[1]
        let monthName
        switch (month) {
            case 'Jan':
                monthName = '01'
                break
            case 'Feb':
                monthName = '02'
                break
            case 'Mar':
                monthName = '03'
                break
            case 'Apr':
                monthName = '04'
                break
            case 'May':
                monthName = '05'
                break
            case 'Jun':
                monthName = '06'
                break
            case 'Jul':
                monthName = '07'
                break
            case 'Aug':
                monthName = '08'
                break
            case 'Sep':
                monthName = '09'
                break
            case 'Oct':
                monthName = '10'
                break
            case 'Nov':
                monthName = '11'
                break
            case 'Dec':
                monthName = '12'
                break
        }
        return `${ztime[0]}-${monthName}-${ztime[2]}`
    },
    getAllProposals(filter){
            let queryFilter = JSON.parse(filter)
            let typeDict = {
                "Alle": "all",
                "Urlaub": "vacation",
                "Krank": "sickness"
            }
            let statusDict = {
                "Alle": "all",
                "Ausstehend": "pending",
                "Genehmigt": "approved",
                "Abgelehnt": "denied"
            }
            let sortDict = {
                "Absteigend": "desc",
                "Aufsteigend": "asce"
            }
            let parameter = {}

            if (queryFilter.selectedType != ("" || "Alle")){
                parameter.type = typeDict[queryFilter.selectedType]
            }
            if (queryFilter.selectedStatus != ("" || "Alle")){
                parameter.status = statusDict[queryFilter.selectedStatus]
            }
            if (queryFilter.selectedOrder != ""){
                parameter.sort = sortDict[queryFilter.selectedOrder]
            }
            return axios.get("/proposals", {
                params: parameter,
                paramsSerializer: params => {
                    return qs.stringify(params)
                }
            })
    },
    updateProposalStatus(proposal, status){
        proposal.status = status
        return axios.patch("/proposals?date=" + proposal.startDate, proposal)
    },
}