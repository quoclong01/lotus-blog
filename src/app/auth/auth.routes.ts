import { PageRoute } from '../core/modules/custom-router-dom/router.interface';
import Auth from './Auth';
import Login from './childrens/Login';
import Register from './childrens/Register';

const authRoutes: PageRoute[] = [
  {
    path: '/auth',
    element: Auth,
    children: [
      { 
        path: 'sign-in', 
        element: Login 
      },
      {       
        path: 'sign-up', 
        element: Register 
      },
    ],
  },
];

export default authRoutes;
