import type { Base } from './Base';
import type { Post } from './Post';

export interface EmbeddedPost extends Base {
  post: Post;
}
