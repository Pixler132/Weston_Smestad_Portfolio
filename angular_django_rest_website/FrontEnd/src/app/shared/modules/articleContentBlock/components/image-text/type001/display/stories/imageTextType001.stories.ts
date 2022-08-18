// ArticleComponent.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { provideMockStore } from '@ngrx/store/testing'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'

import { CommonModule } from '@angular/common'
import { ImageTextType001Component } from '../imageTextType001.component'

//👇 This default export determines where your story goes in the story list

// the state for the mockStore

export default {
  title: 'ImageTextType001Component',
  component: ImageTextType001Component,
  decorators: [
    moduleMetadata({
      declarations: [ImageTextType001Component],
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
    type: 'image-image',
    body: 'null',
    imageOne: 'media/articles/2022/03/07/article_yM3EjTM.jpeg',
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
    type: 'image-image',
    body: null,
    imageOne: 'media/articles/2022/03/07/article_yM3EjTM.jpeg',
    imageTwo: 'media/articles/2022/03/07/article_yM3EjTM.jpeg',
    position: 1,
    customObject: false,
  },
  //👇 The args you need here will depend on your component
}
