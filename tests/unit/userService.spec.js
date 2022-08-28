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
            var someerror = new Error("invalid data")
            axios.post.mockRejectedValueOnce(someerror)

            const result = await userService.getLoggedinUser(loginForm.username, loginForm.password)

            expect(result).toEqual(someerror)
        })
    })
})

