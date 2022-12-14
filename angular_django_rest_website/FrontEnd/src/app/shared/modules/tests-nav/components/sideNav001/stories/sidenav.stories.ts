// ArticleComponent.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular'

import '@angular/router'

import { SideNav001Component } from '../sideNav.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//๐ This default export determines where your story goes in the story list

// the state for the mockStore

export default {
  /* ๐ The title prop is optional.
   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'navigation/sideNav/type001',
  component: SideNav001Component,
  argTypes: {
    variant: {},
  },
  subcomponent: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserAnimationsModule],
    }),
  ],
  providers: [],
} as Meta

//๐ We create a โtemplateโ of how args map to rendering
const Template: Story = (args) => ({
  props: args,
})

export const FirstStory = Template.bind({})
FirstStory.args = { category: ['coding', 'python'], isOpen: false }
export const NoStory = Template.bind({})
NoStory.args = {}
