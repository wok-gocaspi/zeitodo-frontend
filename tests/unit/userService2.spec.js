// import { shallowMount } from "@vue/test-utils";
// import flushPromises from "flush-promises";
import userService from "@/services/userService";
import axios from "axios";
//import {nextTick} from "vue";

jest.mock("axios");

describe("LoginDialog.vue", () => {
    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {
        //      var wrapper = shallowMount(userService);
        const expectedData = {token:"faketoken"}
     let   fakePromise = new Promise(resolve => resolve(expectedData))


        axios.post.mockResolvedValue(fakePromise)
   //   await  userService.getLoggedinUser("Peter","Zwegert").then((res)=>expect(res).toEqual(expectedData.token))
       await  userService.getLoggedinUser("Peter","Zwegert").then(res => expect(res).toEqual(expectedData))

        expect(axios.post).toHaveBeenCalledTimes(1)

    });


    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {
        //      var wrapper = shallowMount(userService);
        const expectedData =  {
            userId:"123",
            username:"fakeName"
        }
        let   fakePromise = new Promise(resolve => resolve(expectedData))


        axios.get.mockResolvedValue(fakePromise)
        //   await  userService.getLoggedinUser("Peter","Zwegert").then((res)=>expect(res).toEqual(expectedData.token))
        await  userService.getSelf().then(res => expect(res).toEqual(expectedData))

        expect(axios.post).toHaveBeenCalledTimes(1)

    });

});



describe("GetAllTimeEntries", () => {
    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {
        //      var wrapper = shallowMount(userService);
        const expectedData =  {
            userId:"123",
            username:"fakeName"
        }


        axios.get.mockResolvedValue(expectedData)
        //   await  userService.getLoggedinUser("Peter","Zwegert").then((res)=>expect(res).toEqual(expectedData.token))
      //  let dummy;
      let result =  await  userService.getAllTimeEntries2("123")
        expect(result).toEqual(expectedData)
        expect(axios.get).toHaveBeenCalledTimes(1)

    });

});

describe("GetAllTimeEntries", () => {
    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {
        //      var wrapper = shallowMount(userService);
        const expectedData =  {
            userId:"123",
            username:"fakeName"
        }

        axios.get.mockResolvedValue(expectedData)
        let result =  await  userService.getProjectEffort1("123")
        expect(result).toEqual(expectedData)
        expect(axios.get).toHaveBeenCalledTimes(1)

    });

});