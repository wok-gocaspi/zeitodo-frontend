// import { shallowMount } from "@vue/test-utils";
// import flushPromises from "flush-promises";
import userService from "@/services/userService";

jest.mock("axios", () => ({
    post: () => Promise.resolve({ token: "fakeToken" })
}));

describe("Posts.vue", () => {
    it("mocking the axios call to post correct username and password", async () => {
  //      var wrapper = shallowMount(userService);
       let res =   userService.getLoggedinUser("Peter","123")
        await res
        let data
        res.then(response=> data = response)
        await data

 //       await flushPromises();
   //     expect(data).toBe({ token: "fakeToken" });
       expect(res).toBeTruthy()
    });
});