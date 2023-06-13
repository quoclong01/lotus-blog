import Page from './Page';
import { PageRoute } from '../core/modules/custom-router-dom/router.interface';
import userRoutes from './user/user.routes';
import postRoutes from './posts/posts.routes';
import bookmarkRoutes from './bookmarks/bookmarks.routes';

const pageRoutes: PageRoute[] = [
  {
    path: '/',
    element: Page,
    children: [
      {
        path: '',
        redirect: 'posts',
      },
      ...postRoutes,
      ...bookmarkRoutes,
      ...userRoutes,
    ],
  },
];

export default pageRoutes;
