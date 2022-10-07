
import stundenkontoService from "@/services/stundenkontoService";
import moment from "moment-timezone";
import axios from "axios";




jest.mock("axios")

describe("Axios Requests",()=>{

    it("get Absence", async() => {
        const userid = "123456789"
        const proposal = JSON.stringify(
            {
                userId: "1234",
                startDate: "06-12-2022",
                endDate: "06-20-2022",
                type: "sickness"
            }
        )
        axios.get.mockResolvedValueOnce(proposal)
        const result = await stundenkontoService.getAbsence(userid)
        expect(result).toEqual(proposal)


    })
})

describe("Axios Requests",()=>{

    it ("get vacation and sickness",async ()=> {
        const userid = "123456789"
        const mochresult = {"sickness": [{"endDate": "06-20-2022", "startDate": "06-12-2022", "type": "sickness", "userId": "1234"}], "vacation": [{"endDate": "06-20-2022", "startDate": "06-12-2022", "status": "approved", "type": "vacation", "userId": "1234"}]}
        const proposal = ({data:[

            {
                userId: "1234",
                startDate: "06-12-2022",
                endDate: "06-20-2022",
                type: "sickness"

            },
            {
                userId: "1234",
                startDate: "06-12-2022",
                endDate: "06-20-2022",
                type: "vacation",
                status:"approved"

            }
            ]}
        )
        axios.get.mockResolvedValueOnce(proposal)
        const result = await stundenkontoService.getvacationandsickness(JSON.stringify(userid))
        expect(result).toEqual(mochresult)
    })
})
describe("Axios Requests",()=>{

    it("get time", async () => {

        const get = Date.now().toString()
        let UTCtime=moment(get).tz("Europe/Berlin").format("HH:mm")


        const result = await stundenkontoService.gettime(UTCtime)
        expect(result).toEqual(UTCtime)

    })


})
describe("Axios Requests",()=>{

    it("get date", async () => {
        const getdate = Date.now().toString()
        let UTCdate=moment(getdate).tz("Europe/Berlin").format("YYYY-MM-DD")

        const result = await stundenkontoService.getdate(UTCdate)
        expect(result).toEqual(UTCdate)
    })


})