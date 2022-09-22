// import { shallowMount } from "@vue/test-utils";
// import flushPromises from "flush-promises";

import timeentryService from "@/services/timeentryService";

import axios from "axios"
import moment from "moment-timezone";



jest.mock("axios")
describe("Axios Requests", () => {

        it("creat time", async () => {
            const creattime = {
                startdate :Date.now().toString(),
                endDate :Date.now().toString(),
                breakstartdate:Date.now().toString(),
                breakenddate:Date.now().toString(),

            }
            const userid = "6317793bd4a3cd6e77d99360"
            axios.get.mockResolvedValueOnce(userid)

            axios.post.mockResolvedValueOnce(JSON.stringify(creattime))

            const result = await timeentryService.creattimeentry(JSON.stringify(creattime))
                expect(result).toEqual(JSON.stringify(creattime))
        })

    })
describe("Axios Requests",()=>{

    it("get time entry", async () => {
    const gettime = {
        startDate: Date.now().toString(),
        endDate: Date.now().toString(),
        breakStartDate: Date.now().toString(),
        breakEndDate: Date.now().toString(),
    }
    const userid = "6317793bd4a3cd6e77d99360"
    axios.get.mockResolvedValueOnce(userid)

    axios.get.mockResolvedValueOnce(JSON.stringify(gettime))
    const result = await timeentryService.getTimeentry(JSON.stringify(gettime))
    expect(result).toEqual(JSON.stringify(gettime))
})


})

describe("Axios Requests",()=>{


    it("update time", async () => {

        const update = {
            start: new Date(Date.now().toString()),
            end: new Date(Date.now().toString()),
            breakStart: new Date(Date.now().toString()),
            breakEnd:new Date(Date.now().toString()),
        }
        const userid = "6317793bd4a3cd6e77d99360"
        axios.get.mockResolvedValueOnce(userid)

        axios.put.mockResolvedValueOnce(JSON.stringify(update))
        const result = await timeentryService.updatetimeentry(JSON.stringify(update))
        expect(result).toEqual(JSON.stringify(update))
    })


})
describe("Axios Requests",()=>{

    it("get time", async () => {

        const get = Date.now().toString()
        let UTCtime=moment(get).tz("Europe/Berlin").format("HH:mm")


        const result = await timeentryService.gettime(UTCtime)
        expect(result).toEqual(UTCtime)

    })


})
describe("Axios Requests",()=>{

    it("get date", async () => {
        const getdate = Date.now().toString()
        let UTCdate=moment(getdate).tz("Europe/Berlin").format("YYYY-MM-DD")

        const result = await timeentryService.getdate(UTCdate)
        expect(result).toEqual(UTCdate)
    })


})