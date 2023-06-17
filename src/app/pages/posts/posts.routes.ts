import { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import { Home, Edit, New, PostDetail, RecycleBin, Draft } from './childrens/index';
import Posts from './Posts';

const postRoutes: PageRoute[] = [
  {
    path: '/posts',
    element: Posts,
    children: [
      {
        path: '',
        element: Home,
      },
      {
        path: ':id',
        element: PostDetail,
      },
      {
        path: 'me',
        element: PostDetail,
      },
      {
        path: 'new',
        element: New,
        isProtected: true,
      },
      {
        path: ':id/edit',
        element: Edit,
        isProtected: true,
      },
      {
        path: 'recycle-bin',
        element: RecycleBin,
        isProtected: true,
      },
      {
        path: 'draft',
        element: Draft,
        isProtected: true
      }
    ],
  },
];

export default postRoutes;
