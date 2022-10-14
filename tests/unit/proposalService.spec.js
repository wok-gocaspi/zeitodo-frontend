import proposalService from "@/services/proposalService";
import axios from "axios"

jest.mock("axios")

describe("Axios Requests", () => {
    it("create proposal correct order", async () => {
        const mockProposal = JSON.stringify(
            {
                userId: "1234",
                startDate: "06-12-2022",
                endDate: "06-20-2022",
                type: "sickness"
            }
        )
        const userid = "123456789"
        axios.post.mockResolvedValueOnce(userid)

        const result = await proposalService.createProposal(mockProposal)
        expect(result).toEqual(userid)
    })
    it("create proposal incorrect order", async () => {
        const mockProposal = JSON.stringify(
            {
                userId: "1234",
                startDate: "06-20-2022",
                endDate: "06-12-2022",
                type: "sickness"
            }
        )
        const userid = "123456789"
        axios.post.mockResolvedValueOnce(userid)

        const result = await proposalService.createProposal(mockProposal)
        expect(result).toEqual(userid)
    })
    it("delete proposal", async () => {
        const mockProposal = JSON.stringify(
            {
                userId: "1234",
                startDate: "06-12-2022",
                endDate: "06-20-2022",
                type: "sickness"
            }
        )
        const deleteCount = "1"
        axios.delete.mockResolvedValueOnce(deleteCount)

        const result = await proposalService.deleteProposal(mockProposal)
        expect(result).toEqual(deleteCount)
    })
    it("get proposals by userid", async() => {
        const userid = "123456789"
        const mockProposal = JSON.stringify(
            {
                userId: "1234",
                startDate: "06-12-2022",
                endDate: "06-20-2022",
                type: "sickness"
            }
        )
        axios.get.mockResolvedValueOnce(mockProposal)
        const result = await proposalService.getProposalsByUserID(userid)
        expect(result).toEqual(mockProposal)


    })
    it("get all proposals", async() => {
        const mockFilter = {
            selectedType: "Urlaub",
            selectedStatus: "All",
            selectedOrder: "Aufsteigend",
            selectedUser: "Peter"
        }
        const mockResult = [
            {
                userId: "123",
            }
        ]
        axios.get.mockResolvedValueOnce(mockResult)
        const result = await proposalService.getAllProposals(JSON.stringify(mockFilter))
        expect(result).toEqual(mockResult)

    })
    it("update proposal status", async() => {
        const mockProposal = {
            userId: "1234",
            startDate: "06-12-2022",
            endDate: "06-20-2022",
            type: "sickness"
        }
        const mockStatus = "approved"
        const mockResult = {
            updatedItems: 1,
        }

        axios.patch.mockResolvedValueOnce(mockResult)
        const result = await proposalService.updateProposalStatus(mockProposal, mockStatus)
        expect(result).toEqual(mockResult)

    })
    it("test mdtime2time", async() => {
        const dateSamples = ["2022-01-10", "2022-02-13", "2022-03-12", "2022-04-20", "2022-05-21", "2022-06-17", "2022-07-23", "2022-08-26", "2022-09-22", "2022-10-03", "2022-11-17", "2022-12-19"]
        const dateResults = ["2022-Jan-10", "2022-Feb-13", "2022-Mar-12", "2022-Apr-20", "2022-May-21", "2022-Jun-17", "2022-Jul-23", "2022-Aug-26", "2022-Sep-22", "2022-Oct-03", "2022-Nov-17", "2022-Dec-19"]
        dateSamples.forEach((date, index) => {
            let result = proposalService.MDTime2ZTime(date)
            expect(result).toEqual(dateResults[index])
        })
    })

    it("converts time format from YYYY-MMM-DD to YYYY-MM-DD", ()=>{
        const dateResultsM = ["2022-01-10", "2022-02-13", "2022-03-12", "2022-04-20", "2022-05-21", "2022-06-17", "2022-07-23", "2022-08-26", "2022-09-22", "2022-10-03", "2022-11-17", "2022-12-19"]
        const dateSamplesZ = ["2022-Jan-10", "2022-Feb-13", "2022-Mar-12", "2022-Apr-20", "2022-May-21", "2022-Jun-17", "2022-Jul-23", "2022-Aug-26", "2022-Sep-22", "2022-Oct-03", "2022-Nov-17", "2022-Dec-19"]
        dateSamplesZ.forEach((date, index) => {
            let result = proposalService.ZTimeToMDTime(date)
            expect(result).toEqual(dateResultsM[index])
        })
    })



})