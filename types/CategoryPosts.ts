import type { Category } from './Category';
import type { Base } from './Base';

export interface CategoryPosts extends Base {
  count: number;
  category: Category;
}
