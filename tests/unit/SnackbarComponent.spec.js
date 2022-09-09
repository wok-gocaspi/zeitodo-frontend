import SnackbarComponent from "@/components/SnackbarComponent";
import { shallowMount, mount  } from '@vue/test-utils'
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
})
describe("Test Close Button", () => {
    const emitTimeout = jest.spyOn(SnackbarComponent.methods, 'emitTimeout')
    let wrapper
    beforeEach(()=> {
        Vue.use(Vuetify)
        wrapper = mount(SnackbarComponent, {
            propsData: {
                snackbardata: {text: "Hello World", timeout: 5000, color: "blue"}
            },
            data(){
                return{
                    snackbar: true
                }
            }
        })
    })
    it("should trigger emitTimeout method", async() => {
        const button = wrapper.find(".closeButton")
        expect(button.exists()).toBe(true)
        expect(emitTimeout).toHaveBeenCalledTimes(0)
        button.vm.$emit('click')
        await wrapper.vm.$nextTick()
        expect(emitTimeout).toHaveBeenCalledTimes(1)
        expect(wrapper.vm.snackbar).toBeFalsy()
    })
})