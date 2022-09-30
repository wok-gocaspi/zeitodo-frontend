import DashboardView from "@/views/DashboardView";
import {shallowMount} from '@vue/test-utils'
import Vuetify from 'vuetify'
import {createPinia, PiniaVuePlugin} from "pinia";

const pinia = createPinia()

import Vue from "vue"


describe("Proposal View", () => {
    let wrapper

    beforeEach(() => {
        Vue.use(Vuetify)
        Vue.use(PiniaVuePlugin)
        wrapper = shallowMount(DashboardView, {
            pinia,
            data(){
                return{
                    proposals: [
                        {
                            "startDate": "2022-08-12",
                            "endDate": "2022-08-20",
                            "type": "sickness",
                            "approved": true
                        }
                    ]
                }
            }
        })
    })
    it("renders the three vue-cards in the Dashboard", () => {
  //      expect(wrapper.get("#midCard").text()).toEqual("2022-08-12 --- 2022-08-20")
        expect(wrapper.get("#midCard")).toBeTruthy()
        expect(wrapper.get("#topCard")).toBeTruthy()
        expect(wrapper.get("#botCard")).toBeTruthy()
  //
    })

    it("midCard renders correct title", ()=>{
        let expected = "Leistungen in Stunden"
        expect(wrapper.get("#midCard-title").text()).toEqual(expected)
    })
    it("botCard renders correct title", ()=>{
        let expected = "Projekte in Minuten"
        expect(wrapper.get("#botCard-title").text()).toEqual(expected)
    })
})