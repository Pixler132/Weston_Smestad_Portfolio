// ArticleComponent.stories.ts

import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { ArticleComponent } from '../article.component'
import { provideMockStore } from '@ngrx/store/testing'
import '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute } from '@angular/router'
import { ArticleContentBlockModule } from 'src/app/shared/modules/articleContentBlock/articleContentBlock.module'
import { TitleType001Component } from 'src/app/shared/modules/articleContentBlock/components/titles/type001/display/titleType001.component'
import { HttpClientModule } from '@angular/common/http'
import { ArticleService } from 'src/app/shared/services/article.service'
import { BodyType001Component } from 'src/app/shared/modules/articleContentBlock/components/bodys/type001/display/articleDisplayType005.component'
import { ImageTextType001Component } from 'src/app/shared/modules/articleContentBlock/components/image-text/type001/display/imageTextType001.component'
import { ImageImageType001Component } from 'src/app/shared/modules/articleContentBlock/components/imageImage/type001/display/imageImageType001.component'
import { ImageType001Component } from 'src/app/shared/modules/articleContentBlock/components/images/type001/display/imageType001.component'
import { TextImageType001Component } from 'src/app/shared/modules/articleContentBlock/components/text-image/type001/display/textImageType001.component'

//👇 This default export determines where your story goes in the story list
const example_data = {
  article: {
    id: 5,
    content: [
      {
        title: '4 Strategies for Combatting Decision Fatigue',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 0,
      },
      {
        title: null,
        body: null,
        type: 'image',
        imageOne: 'media/articles/2022/03/07/Content_TW3sM57.jpeg',
        imageTwo: null,
        customObject: false,
        position: 1,
      },
      {
        title: null,
        body:
          'Science proves it: decision fatigue is a real thing. By the end of your workday, your emotional and intellectual horsepower is depleted. When leaders invest precious energy in low-impact decisions, everyone pays a price. Hoarding decisions undervalues employees. It also keeps you from making bigger decisions that really matter. You can’t escape decision-making, but you can separate the high-leverage decisions from the rest.\n\nThere are certain kinds of decisions that only you can make. That’s true for everyone in your organization. When you activate people to lead within their sphere of influence, you get the best result across your entire business. To maximize the return on daily decision-making, follow these four simple strategies.',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 2,
      },
      {
        title: '1. NEVER MAKE THE SAME DECISION TWICE',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 3,
      },
      {
        title: null,
        body:
          'Many decisions are recurring choices. When you’re determining which vendors to use or what schedule to follow, simply make the decision once. Then automate it or document it. When you are asked about vacation approvals, parental leave, or compensation changes, documented policies can save immense amounts of brainpower. Here’s an example. A few years ago, I decided to no longer do one-on-one consulting. Now, when the request comes in, my executive assistant knows to decline on my behalf. I benefit from this strategy every day.',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 4,
      },
      {
        title: '2. LET OTHERS CHOOSE FOR YOU',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 5,
      },
      {
        title: null,
        body:
          'Many leaders fall into the trap of micro-managing. This not only zaps your mental energy but also negatively impacts your employees. It’s tempting to overthink non-essential choices. Instead, ask yourself, Can someone else answer this for me? Holding onto trivial decisions is costly and foolish. Hire talented people and let them lead with excellence.',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 6,
      },
      {
        title: '3. USE A DEFINED PROCESS FOR MAKING TOUGH DECISIONS',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 7,
      },
      {
        title: null,
        body:
          'Build a process that considers all variables. Years ago, I started using a recommendation briefing form. When someone on my team has an idea for our business, they write up a one-sheet summary of the recommendation. This sheet includes background information, rationale, resources needed, and the projected financial impact. Instead of pitching an idea and leaving me to do the profitability analysis, my team knows to do their own leg work. At this point, my job is simply choosing yes or no. No follow-up meetings are needed for the deliberation process.',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 8,
      },
      {
        title: '4. TAKE CARE OF YOURSELF',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 9,
      },
      {
        title: null,
        body:
          'Your thinking is manipulated by biochemical reactions in your body. In fact, there’s a direct correlation between inadequate sleep and poor decision-making. To make the best decisions, you must be in a good place. This includes getting proper rest, regular exercise, and adequate nutrition. Take time to rejuvenate so you can lead your company well.\n\nWhen you add these four simple strategies, you’ll gain the confidence to make fewer, faster, and better decisions. Which strategy will you start implementing this week?',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 10,
      },
    ],
    author: {
      authorId: 5,
      username: 'asdf',
      profileImg: 'media/Profile/default.jpeg',
    },
    articleTitle: '4 Strategies for Combatting Decision Fatigue',
    articleImage: 'media/articles/2022/03/07/article_yM3EjTM.jpeg',
    articleDescription: '4 Strategies for Combatting Decision Fatigue',
    creationDate: '2022-03-03T20:22:03.849905Z',
    tags: [],
  },
}

// the state for the mockStore
const initialState = {
  state_key: example_data,
}
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'ArticleComponent',
  component: ArticleComponent,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
  subcomponent: {
    BodyType001Component,
    TitleType001Component,
    ImageType001Component,
    ImageImageType001Component,
    ImageTextType001Component,
    TextImageType001Component,
  },
  decorators: [
    moduleMetadata({
      declarations: [
        BodyType001Component,
        TitleType001Component,
        ImageType001Component,
        ImageImageType001Component,
        ImageTextType001Component,
        TextImageType001Component,
      ],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [provideMockStore({ initialState }), ArticleService],
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
  variant: 'primary',
  article: {
    id: 5,
    content: [
      {
        title: '4 Strategies for Combatting Decision Fatigue',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 0,
      },
      {
        title: null,
        body: null,
        type: 'image',
        imageOne: 'media/articles/2022/03/07/Content_TW3sM57.jpeg',
        imageTwo: null,
        customObject: false,
        position: 1,
      },
      {
        title: null,
        body:
          'Science proves it: decision fatigue is a real thing. By the end of your workday, your emotional and intellectual horsepower is depleted. When leaders invest precious energy in low-impact decisions, everyone pays a price. Hoarding decisions undervalues employees. It also keeps you from making bigger decisions that really matter. You can’t escape decision-making, but you can separate the high-leverage decisions from the rest.\n\nThere are certain kinds of decisions that only you can make. That’s true for everyone in your organization. When you activate people to lead within their sphere of influence, you get the best result across your entire business. To maximize the return on daily decision-making, follow these four simple strategies.',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 2,
      },
      {
        title: '1. NEVER MAKE THE SAME DECISION TWICE',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 3,
      },
      {
        title: null,
        body:
          'Many decisions are recurring choices. When you’re determining which vendors to use or what schedule to follow, simply make the decision once. Then automate it or document it. When you are asked about vacation approvals, parental leave, or compensation changes, documented policies can save immense amounts of brainpower. Here’s an example. A few years ago, I decided to no longer do one-on-one consulting. Now, when the request comes in, my executive assistant knows to decline on my behalf. I benefit from this strategy every day.',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 4,
      },
      {
        title: '2. LET OTHERS CHOOSE FOR YOU',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 5,
      },
      {
        title: null,
        body:
          'Many leaders fall into the trap of micro-managing. This not only zaps your mental energy but also negatively impacts your employees. It’s tempting to overthink non-essential choices. Instead, ask yourself, Can someone else answer this for me? Holding onto trivial decisions is costly and foolish. Hire talented people and let them lead with excellence.',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 6,
      },
      {
        title: '3. USE A DEFINED PROCESS FOR MAKING TOUGH DECISIONS',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 7,
      },
      {
        title: null,
        body:
          'Build a process that considers all variables. Years ago, I started using a recommendation briefing form. When someone on my team has an idea for our business, they write up a one-sheet summary of the recommendation. This sheet includes background information, rationale, resources needed, and the projected financial impact. Instead of pitching an idea and leaving me to do the profitability analysis, my team knows to do their own leg work. At this point, my job is simply choosing yes or no. No follow-up meetings are needed for the deliberation process.',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 8,
      },
      {
        title: '4. TAKE CARE OF YOURSELF',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 9,
      },
      {
        title: null,
        body:
          'Your thinking is manipulated by biochemical reactions in your body. In fact, there’s a direct correlation between inadequate sleep and poor decision-making. To make the best decisions, you must be in a good place. This includes getting proper rest, regular exercise, and adequate nutrition. Take time to rejuvenate so you can lead your company well.\n\nWhen you add these four simple strategies, you’ll gain the confidence to make fewer, faster, and better decisions. Which strategy will you start implementing this week?',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 10,
      },
    ],
    author: {
      authorId: 5,
      username: 'asdf',
      profileImg: 'media/Profile/default.jpeg',
    },
    articleTitle: '4 Strategies for Combatting Decision Fatigue',
    articleImage: 'media/articles/2022/03/07/article_yM3EjTM.jpeg',
    articleDescription: '4 Strategies for Combatting Decision Fatigue',
    creationDate: '2022-03-03T20:22:03.849905Z',
    tags: ['hello', 'no'],
  },

  isAuthor$: true,
}
export const NoStory = Template.bind({})
NoStory.args = {
  variant: 'secondary',
  article: {
    id: 5,
    content: [
      {
        title: '',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 0,
      },
      {
        title: null,
        body: null,
        type: 'image',
        imageOne: 'media/articles/2022/03/07/Content_TW3sM57.jpeg',
        imageTwo: null,
        customObject: false,
        position: 1,
      },
      {
        title: null,
        body:
          'Science proves it: decision fatigue is a real thing. By the end of your workday, your emotional and intellectual horsepower is depleted. When leaders invest precious energy in low-impact decisions, everyone pays a price. Hoarding decisions undervalues employees. It also keeps you from making bigger decisions that really matter. You can’t escape decision-making, but you can separate the high-leverage decisions from the rest.\n\nThere are certain kinds of decisions that only you can make. That’s true for everyone in your organization. When you activate people to lead within their sphere of influence, you get the best result across your entire business. To maximize the return on daily decision-making, follow these four simple strategies.',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 2,
      },
      {
        title: '1. NEVER MAKE THE SAME DECISION TWICE',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 3,
      },
      {
        title: null,
        body:
          'Many decisions are recurring choices. When you’re determining which vendors to use or what schedule to follow, simply make the decision once. Then automate it or document it. When you are asked about vacation approvals, parental leave, or compensation changes, documented policies can save immense amounts of brainpower. Here’s an example. A few years ago, I decided to no longer do one-on-one consulting. Now, when the request comes in, my executive assistant knows to decline on my behalf. I benefit from this strategy every day.',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 4,
      },
      {
        title: '2. LET OTHERS CHOOSE FOR YOU',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 5,
      },
      {
        title: null,
        body:
          'Many leaders fall into the trap of micro-managing. This not only zaps your mental energy but also negatively impacts your employees. It’s tempting to overthink non-essential choices. Instead, ask yourself, Can someone else answer this for me? Holding onto trivial decisions is costly and foolish. Hire talented people and let them lead with excellence.',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 6,
      },
      {
        title: '3. USE A DEFINED PROCESS FOR MAKING TOUGH DECISIONS',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 7,
      },
      {
        title: null,
        body:
          'Build a process that considers all variables. Years ago, I started using a recommendation briefing form. When someone on my team has an idea for our business, they write up a one-sheet summary of the recommendation. This sheet includes background information, rationale, resources needed, and the projected financial impact. Instead of pitching an idea and leaving me to do the profitability analysis, my team knows to do their own leg work. At this point, my job is simply choosing yes or no. No follow-up meetings are needed for the deliberation process.',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 8,
      },
      {
        title: '4. TAKE CARE OF YOURSELF',
        body: null,
        type: 'title',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 9,
      },
      {
        title: null,
        body:
          'Your thinking is manipulated by biochemical reactions in your body. In fact, there’s a direct correlation between inadequate sleep and poor decision-making. To make the best decisions, you must be in a good place. This includes getting proper rest, regular exercise, and adequate nutrition. Take time to rejuvenate so you can lead your company well.\n\nWhen you add these four simple strategies, you’ll gain the confidence to make fewer, faster, and better decisions. Which strategy will you start implementing this week?',
        type: 'body',
        imageOne: null,
        imageTwo: 'media/',
        customObject: false,
        position: 10,
      },
    ],
    author: {
      authorId: 5,
      username: 'asdf',
      profileImg: 'media/Profile/default.jpeg',
    },
    articleTitle: '4 Strategies for Combatting Decision Fatigue',
    articleImage: 'media/articles/2022/03/07/article_yM3EjTM.jpeg',
    articleDescription: '4 Strategies for Combatting Decision Fatigue',
    creationDate: '2022-03-03T20:22:03.849905Z',
    tags: ['hello', 'no'],
  },

  isAuthor$: true,
}
