import SnackbarComponent from "@/components/SnackbarComponent";
import { shallowMount  } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vue from "vue"

describe("SnackbarComponent", () => {
    let wrapper
    beforeEach(() => {
        Vue.use(Vuetify)
        wrapper = shallowMount(SnackbarComponent, {
            propsData: {
                snackbardata: {text: "Hello World", timeout: 5000, color: "blue"}
            }
        })
    })
    it("check default visibility", () => {
        expect(wrapper.find(".main-snackbar").isVisible()).toBe(true)
    })
    it("timeout hides the snackbar", () => {

    })
})