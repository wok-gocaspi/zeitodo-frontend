import DeleteUserDialog from "@/components/DeleteUserDialog";
import { shallowMount} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vue from "vue"

describe("SnackbarComponent", () => {
    let wrapper
    beforeEach(() => {
        Vue.use(Vuetify)
        wrapper = shallowMount(DeleteUserDialog, {
            data(){
                return{
                    dialog: true
                }
            },
            propsData: {
                userid: "123",
                username: "Peter"
            },
        })
    })
    it("check template render", () => {
        expect(wrapper.get("#usr-title").text()).toEqual("Delete Peter")
        expect(wrapper.get("#usr-text").text()).toEqual("Are you sure to delete Peter")
        expect(wrapper.vm.dialog).toBe(true)
    })
})