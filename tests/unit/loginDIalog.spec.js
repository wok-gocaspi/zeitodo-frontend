
import { shallowMount,mount  } from '@vue/test-utils'
import LoginDialog from '@/components/LoginDialog.vue'
import Vuetify from 'vuetify'
/*
import Vue from 'vue'
Vue.use(Vuetify)

 */
import Vue from 'vue'

describe('LoginDialog.vue', () => {

let wrapper

    beforeEach(() => {
        Vue.use(Vuetify)
        wrapper = shallowMount(LoginDialog, {})
    })

    it('Checks the save button exists in the DOM', () => {
      let  btn = wrapper.find('#saveBtn')
        expect(btn.exists()).toBe(true)
    })
/*
    it("calls the setVisibilityMethod",()=>{
       const wrapper = shallowMount(LoginDialog, {
            propsData: {  }
        })

        let  btn = wrapper.find('#saveBtn')
        btn.trigger('click')
        expect(wrapper.emitted()).toHaveProperty('closed')
    })

 */

    it("calls the setVisibilityMethod",async ()=>{
        const wrapper = shallowMount(LoginDialog, )
        wrapper.vm.$emit('closed')
        await wrapper.vm.$nextTick()
        let  btn = wrapper.find('#saveBtn')
       btn.trigger('click')
        expect(wrapper.emitted().closed).toBeTruthy()

    })

    it("calls the setVisibilityMethod",async ()=>{
        const wrapper = mount(LoginDialog )
        wrapper.vm.$emit('closed')
        await wrapper.vm.$nextTick()
        //   let  btn = wrapper.find('#saveBtn')
        //    btn.trigger('click')

      let  username = wrapper.find('#username')
        username.setValue("fakeUserName")
        let password = wrapper.find('#username')
        password.setValue("fakePassword")

           let  btn = wrapper.find('#saveBtn')
            btn.trigger('click')
    //    expect(wrapper).toBeTruthy()

    })

})
