import { ArticlesInterface } from './articles.interface'

export interface GetArticleResponseInterface {
  article: ArticlesInterface
}
export interface GetArticleResponseInterface2 {
  footer: {
    mainImg: string | null
    altImg: string | null
    mainTitle: string | null
    altTitle: string | null
    mainBody: string | null
    altBody: string | null
    socialLink: [] | null
  }
}
export interface SocialLinks {
  mediaType: string
  socialUrl: string
}

export interface header {
  title: string
  img: string
  linkNames: string[]
}
