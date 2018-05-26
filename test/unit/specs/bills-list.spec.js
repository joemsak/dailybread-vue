import Vue from 'vue'
import { mount } from '@vue/test-utils'

import List from '@/components/bills/List'

describe('bills/List.vue', () => {
  it('renders an empty list of bills', () => {
    const wrapper = mount(List)
    expect(wrapper.text()).toContain('No bills to show yet ...')
  })
})
