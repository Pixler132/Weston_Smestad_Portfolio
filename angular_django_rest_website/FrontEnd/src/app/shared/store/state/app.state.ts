import { ArticleStateInterface } from 'src/app/pages/article/store/state/article.State'
import { CreateArticleStateInterface } from 'src/app/pages/createArticle/store/state/createArticle.state'
import { EditArticleStateInterface } from 'src/app/pages/editArticle/store/state/editArticle.state'
import { UserProfileStateInterface } from 'src/app/pages/userProfile/store/state/userProfile.state'
import { AuthStateInterface } from '../../../pages/auth/store/state/auth.state'
import { CommentStateInterface } from '../../modules/articleComments/store/state/comment.state'
import { FavoriteFeedStateInterface } from '../../modules/favoriteFeed/store/state/feed.state'
import { FeedStateInterface } from '../../modules/feed/store/state/feed.state'

export interface AppStateInterface {
  auth: AuthStateInterface
  article: ArticleStateInterface
  createActicle: CreateArticleStateInterface
  editActicle: EditArticleStateInterface
  userProfile: UserProfileStateInterface
  feed: FeedStateInterface
  comment: CommentStateInterface
  favoriteFeed: FavoriteFeedStateInterface
}
/**
if you change this you have to change in the module and selectors


*/
