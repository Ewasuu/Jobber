import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Searcher from '../../views/SearchJobs.vue'

describe('Searcher', () => {
  it('renders properly', () => {
    const wrapper = mount(Searcher)
    expect(wrapper.text())
  })
})
