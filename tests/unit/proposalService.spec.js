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
    it("test mdtime2time", async() => {
        const dateSamples = ["01-"]
        axios.get.mockResolvedValueOnce(mockProposal)
        const result = await proposalService.getProposalsByUserID(userid)
        expect(result).toEqual(mockProposal)


    })


})