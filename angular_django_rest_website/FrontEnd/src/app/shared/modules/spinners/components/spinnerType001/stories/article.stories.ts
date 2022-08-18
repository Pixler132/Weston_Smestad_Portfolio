// ArticleComponent.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { provideMockStore } from '@ngrx/store/testing'
import '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http'

import { MaterialModule } from 'src/app/shared/modules/material/material.module'
import { SpinnerComponent001 } from '../spinner.component'

//👇 This default export determines where your story goes in the story list
const example_data = {}

// the state for the mockStore
const initialState = {
  state_key: example_data,
}
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'spinners/type001',
  component: SpinnerComponent001,
  argTypes: {
    variant: {},
  },
  subcomponent: {},
  decorators: [],
  providers: [],
} as Meta

//👇 We create a “template” of how args map to rendering
const Template: Story = (args) => ({
  props: args,
})

export const FirstStory = Template.bind({})
FirstStory.args = {}
