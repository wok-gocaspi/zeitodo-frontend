// import { shallowMount } from "@vue/test-utils";
// import flushPromises from "flush-promises";

import timeentryService from "@/services/timeentryService";

import axios from "axios"


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