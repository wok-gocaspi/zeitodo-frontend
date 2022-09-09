// import { shallowMount } from "@vue/test-utils";
// import flushPromises from "flush-promises";
import userService from "@/services/userService";
import axios from "axios";
//import {nextTick} from "vue";

jest.mock("axios");

describe("userService Tests", () => {
    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {
        const expectedData = {token:"faketoken"}
        let   fakePromise = new Promise(resolve => resolve(expectedData))

        axios.post.mockResolvedValue(fakePromise)

        await  userService.getLoggedinUser("Peter","Zwegert").then(res => expect(res).toEqual(expectedData))
        expect(axios.post).toHaveBeenCalledTimes(1)

    });

    jest.clearAllMocks();

});

describe("userService Tests", () => {

    it("Calling the userService getSelf returns the loggedIIn user", async () => {
        const fakeCurrentUser =  {
            userId:"123",
            username:"fakeName"
        }
        let   fakePromise = new Promise(resolve => resolve(fakeCurrentUser))

        axios.get.mockResolvedValue(fakePromise)

        await  userService.getSelf().then(res => expect(res).toEqual(fakeCurrentUser))
        expect(axios.post).toHaveBeenCalledTimes(1)

    });
    jest.clearAllMocks();
});


describe("UserService", () => {
    beforeEach(() => { jest.clearAllMocks(); });
    it("Calling get /AllTimeEntires return a array of all timeentries assigned to the logged in user", async () => {
        const expectedData =  [
            { userId:"123", start:"fakeStartDate", end:"fakeEndDate"},
            { userId:"123", start:"fakeStartDate", end:"fakeEndDate"},
            { userId:"123", start:"fakeStartDate", end:"fakeEndDate"},
        ]

        axios.get.mockResolvedValue(expectedData)

        let result =  await  userService.getAllTimeEntries2("123")
        expect(result).toEqual(expectedData)
        //     expect(axios.get).toHaveBeenCalledTimes(1)

    });
    jest.clearAllMocks();
});

describe("UserService", () => {
    it("Calling getProjectEffort returns an object including all projects and the sum of workingHours per project", async () => {
        const Efforts =  {
            Projects:["1","2","3"],
            Hours:[5,10,15]
        }

        axios.get.mockResolvedValue(Efforts)

        let result =  await  userService.getProjectEffort1("123")
        expect(result).toEqual(Efforts)
        //       expect(axios.get).toHaveBeenCalledTimes(1)
        jest.clearAllMocks();
    });

});

describe("UserService", () => {
    it("getTotalTime takes an object of timeEntries and returns the total time spend in all projects", async () => {
        const timeEntriesOfFakeUser =  {
            BMW: 10,
            AUDI: 15,
            Mercedes:20
        }
        const expected = 45;

        let data = userService.data()

        let result =   userService.getTotalTime(timeEntriesOfFakeUser)
        expect(data).toBeTruthy()
        expect(result).toEqual(expected)
    });
});