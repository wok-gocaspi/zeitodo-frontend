import ProposalView from "@/views/ProposalView";
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
        wrapper = shallowMount(ProposalView, {
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
    it("check render", () => {
        expect(wrapper.get("#proposal-title").text()).toEqual("2022-08-12 --- 2022-08-20")
        expect(wrapper.get("#proposal-subtitle").text()).toEqual("Krank")
    })
})