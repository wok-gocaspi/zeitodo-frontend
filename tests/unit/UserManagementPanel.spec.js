import UserManagementPanel from "@/components/UserManagementPanel";
import { shallowMount} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vue from "vue"

describe("SnackbarComponent", () => {
    let wrapper
    beforeEach(() => {
        Vue.use(Vuetify)
        wrapper = shallowMount(UserManagementPanel, {
            data(){
                return{
                    users: [
                        {
                            "id": "123",
                            "username": "Peter",
                            "firstname": "Peter",
                            "lastname": "Der echte"
                        }
                    ]
                }
            }
        })
    })
    it("check template render", () => {
        expect(wrapper.get("#user-title").text()).toEqual("Peter")
        expect(wrapper.get("#user-subtitle").text()).toEqual("Peter Der echte")
        expect(wrapper.get("#cp-btn")).toBeTruthy()
        expect(wrapper.get("#delete-btn")).toBeTruthy()
    })
})