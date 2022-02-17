import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import '../assets/application.scss';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

import { Provider as StoreProvider } from 'react-redux';
import { socketApi } from './socketApi.js';
import ru from './locales/ru.js';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import SocketProvider from './providers/SocketProvider.jsx';
import App from './app/App.jsx';
import store from './slices/index.js';

const init = async (socket) => {
  const rollbarConfig = {
    enabled: process.env.NODE_ENV === 'production',
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
      client: {
        javascript: {
          source_map_enabled: true,
          code_version: '0.0.1',
          guess_uncaught_frames: true,
        },
      },
    },
  };
  const i18nInstance = i18n.createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      debug: false,
      lng: 'ru',
      resources: {
        ru,
      },
    });

  const ErrorPage = () => <NotFoundPage />;
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary level="warn" fallbackUI={ErrorPage}>
        <AuthProvider>
          <StoreProvider store={store}>
            <I18nextProvider i18n={i18nInstance}>
              <SocketProvider socket={socketApi(socket, i18nInstance)}>
                <App />
              </SocketProvider>
            </I18nextProvider>
          </StoreProvider>
        </AuthProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
