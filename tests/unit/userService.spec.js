// import { shallowMount } from "@vue/test-utils";
// import flushPromises from "flush-promises";
import userService from "@/services/userService";
import axios from "axios"

jest.mock("axios")

describe("Axios Requests", () => {
        it("login user", async () => {
            const loginForm = {
                username: "Peter",
                password: "123"
            }
            const token = "123456789"
            axios.post.mockResolvedValueOnce(token)

            const result = await userService.getLoggedinUser(loginForm.username, loginForm.password)
            expect(result).toEqual(token)
        })
        it("get all user", async () => {
            const user = [
                {
                    "id": "123",
                    "username": "Peter"
                },
                {
                    "id": "234",
                    "username": "Hans"
                }
            ]
            axios.get.mockResolvedValueOnce(user)

            const result = await userService.getAllUser()
            expect(result).toEqual(user)
        })
        it("get user", async () => {
            const user = {
                "id": "123",
                "username": "Test"
            }
            axios.get.mockResolvedValueOnce(user)

            const result = await userService.getUserByID(user.id)
            expect(result).toEqual(user)
        })
        it("delete user", async () => {
            const fakeBody = {
                "DeletedCount": 1
            }
            axios.delete.mockResolvedValueOnce(fakeBody)
            const result = await userService.deleteUser("123")
            expect(result).toEqual(fakeBody)
        })
        it("patch user", async () => {
            const fakeBody = [
                {
                    "id": "123",
                    "username": "test"
                }
            ]
            axios.patch.mockResolvedValueOnce(fakeBody)
            const result = await userService.updateUser(fakeBody)
            expect(result).toEqual(fakeBody)
        })
})