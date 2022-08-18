// ArticleComponent.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { CommonModule } from '@angular/common'
import { BodyType001Component } from '../articleDisplayType005.component'

//👇 This default export determines where your story goes in the story list

// the state for the mockStore

export default {
  title: 'BodyType001Component',
  component: BodyType001Component,
  decorators: [
    moduleMetadata({
      declarations: [BodyType001Component],
      imports: [CommonModule],
    }),
  ],
  props: {},
} as Meta

//👇 We create a “template” of how args map to rendering
const Template: Story = (args) => ({
  props: args,
})
export const Default = Template.bind({})
Default.args = {
  baseMedia: 'http://104.254.15.78:8000/',
  content: {
    title: null,
    type: 'body',
    body:
      ' null sdfasdfsadf sdf sdf asdf sdf sdf dfasdf asdf asdf   sdf sdfasdf sadfsdf sdf  sadf  sdfds fasd sdf',
    imageOne: null,
    imageTwo: null,
    position: 0,
    customObject: false,
  },
}
export const FirstStory = Template.bind({})
FirstStory.args = {
  baseMedia: 'http://104.254.15.78:8000/',
  content: {
    title: null,
    type: 'body',
    body: ' null',
    imageOne: null,
    imageTwo: null,
    position: 0,
    customObject: false,
  },
  //👇 The args you need here will depend on your component
}
