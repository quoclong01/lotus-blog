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
import { ToastProvider } from './shared/components/partials/Toast';

function App() {
  const middlewares = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(middlewares, logger));

  middlewares.run(appMiddleware);

  return (
    <Provider store={store}>
      <DialogProvider>
        <ToastProvider>
          <RouterOutlet routes={appRoutes} />
        </ToastProvider>
      </DialogProvider>
    </Provider>
  );
}

export default App;
