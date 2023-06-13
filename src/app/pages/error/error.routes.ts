import { PageRoute } from '../../core/modules/custom-router-dom/router.interface';
import Error from './Error';
import NotFound from './childrens/NotFound';

const errorRoutes: PageRoute[] = [
  {
    path: '',
    element: Error,
    children: [{ path: '*', element: NotFound }],
  },
];

export default errorRoutes;
