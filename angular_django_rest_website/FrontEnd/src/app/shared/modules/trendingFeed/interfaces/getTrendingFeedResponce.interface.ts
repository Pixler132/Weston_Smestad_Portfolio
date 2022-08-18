import { ArticlesInterface } from 'src/app/shared/interfaces/articles.interface'

export interface GetTrendingFeedResponceInterface {
  articles: ArticlesInterface[]
  articleCount: number
}

// { article:{
//   title: string
//   slug: string
//   body: string
//   createdAt: string
//   updatedAt: string
//   tagList: string[]

//   description: string
//   favorite: boolean
//   favoriteCount: number
//   }
//   author: {
//     username: string
//     bio: string | null
//     image: string
//     following: boolean
//   }
// }
