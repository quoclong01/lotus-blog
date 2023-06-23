import { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import Profile from './childrens/Profile';
import Update from './childrens/Update';
import User from './User';
import Chat from './childrens/Chat';

const userRoutes: PageRoute[] = [
  {
    path: '/profile',
    element: User,
    children: [
      {
        path: ':id',
        element: Profile
      },
      {
        path: 'update',
        element: Update,
        isProtected: true
      }
    ],
  },
  {
    path: '/chat',
    element: Chat,
    isProtected: true,
  }
];

export default userRoutes;
