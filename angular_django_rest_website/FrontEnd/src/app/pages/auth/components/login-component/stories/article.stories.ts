// ArticleComponent.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular'

import { provideMockStore } from '@ngrx/store/testing'
import '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http'

import { MaterialModule } from 'src/app/shared/modules/material/material.module'
import { LoginComponent } from '../login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

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
  title: 'arth/login/type001',
  component: LoginComponent,
  argTypes: {
    variant: {},
  },
  subcomponent: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [provideMockStore({ initialState })],
    }),
  ],
  providers: [],
} as Meta

//👇 We create a “template” of how args map to rendering
const Template: Story = (args) => ({
  props: args,
})

export const FirstStory = Template.bind({})
FirstStory.args = {
  total: 20,
  limit: 20,
  article: {
    id: 287,
    author: {
      authorId: 5,
      username: 'jojo',
      profileImg: 'media/',
    },
    creationDate: '2022-03-24T19:28:48.348209Z',
    favorited: true,
    favoriteCount: 6,
    tags: ['a', 'b', 'c'],
    articleImage: 'media/articles/2022/03/24/article_fJyRnm6.jpeg',
    articleDescription: 'a',
    articleTitle: 'Awsome Title Name to remember!!!',
    urlGen: 'awsome-title-name-to-remember:eae57a',
  },
}

export const NoStory = Template.bind({})
NoStory.args = {
  total: 20,
  limit: 20,
  article: {
    id: 287,
    author: {
      authorId: 5,
      username: 'jojo',
      profileImg: 'media/',
    },
    creationDate: '2022-03-24T19:28:48.348209Z',
    favorited: false,
    favoriteCount: 6,
    tags: ['a', 'b', 'c'],
    articleImage: 'media/articles/2022/03/24/article_fJyRnm6.jpeg',
    articleDescription: 'a',
    articleTitle: 'Awsome Title Name to remember!!!',
    urlGen: 'awsome-title-name-to-remember:eae57a',
  },
}
