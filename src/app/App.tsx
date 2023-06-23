import React from 'react';
import { RouterOutlet } from './core/modules/custom-router-dom';

import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import appRoutes from './app.routes';
import appMiddleware from './app.middlewares';
import rootReducer from './app.reducers';

import '../stylesheet/styles.scss';
import { DialogProvider } from './shared/components/partials/Dialog';

import i18n from './core/serivces/i18n.service';
import { I18nextProvider } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  const middlewares = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(middlewares, logger));

  middlewares.run(appMiddleware);

  return (
    <Provider store={store}>
      <DialogProvider>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            limit={3}
          />
          <I18nextProvider i18n={i18n}>
            <RouterOutlet routes={appRoutes} />
          </I18nextProvider>
      </DialogProvider>
    </Provider>
  );
}

export default App;
