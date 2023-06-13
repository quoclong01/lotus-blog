import { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import Bookmark from './Bookmark';

const bookmarkRoutes: PageRoute[] = [
  {
    path: '/bookmarks',
    element: Bookmark,
    isProtected: true,
  },
];

export default bookmarkRoutes;
