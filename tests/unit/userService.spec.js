// import { shallowMount } from "@vue/test-utils";
// import flushPromises from "flush-promises";
import userService from "@/services/userService";
import axios from "axios"

jest.mock("axios")

describe("loginUser", () => {
    describe("login was successful", () => {
        it("send user data", async () => {
            const loginForm = {
                username: "Peter",
                password: "123"
            }
            const token = "123456789"
            axios.post.mockResolvedValueOnce(token)

            const result = await userService.getLoggedinUser(loginForm.username, loginForm.password)

            expect(result).toEqual(token)
        })
    })
    describe("login failed", () => {
        it("send invalid user data", async () => {
            const loginForm = {
                username: "Peter",
                password: "123"
            }
      //      var someerror = new Error("invalid data")
            let someerror = "invalid data"
            axios.post.mockRejectedValueOnce(someerror)

            const result = await userService.getLoggedinUser(loginForm.username, loginForm.password)
            await userService.getLoggedinUser(loginForm.username,loginForm.password)
                .catch(err => expect(err).toEqual(someerror))

            expect(result).toEqual(someerror)
        })
    })
})

describe("login was successful", () => {
    it("send user data", async () => {
        /*
        const loginForm = {
            username: "Peter",
            password: "123"
        }

         */
        const userObject = {
            userId:"123",
            username:"fakeName"
        }
        axios.get.mockResolvedValueOnce(userObject)

        const result = await userService.getSelf()
            .then(data => expect(data).toEqual(userObject))

        expect(result).toEqual(userObject)
    })
})