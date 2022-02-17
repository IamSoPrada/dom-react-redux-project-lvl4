import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import filter from 'leo-profanity';
import { injectStyle } from 'react-toastify/dist/inject-style';
import AuthorizationPage from '../pages/AuthorizationPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Layout from '../components/Layout.jsx';
import PrivateRoute from '../components/private-route/PrivateRoute.jsx';

import LoginForm from '../components/form/LoginForm.jsx';
import SignUpForm from '../components/form/SignUpForm.jsx';

const App = () => {
  useEffect(() => {
    // Загружаем нужные словари для фильтрации бан слов
    filter.add(filter.getDictionary('en'));
    filter.add(filter.getDictionary('ru'));
    injectStyle();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<ChatPage />} />
        </Route>
        <Route path="login" element={<AuthorizationPage><LoginForm /></AuthorizationPage>} />
        <Route path="signup" element={<AuthorizationPage><SignUpForm /></AuthorizationPage>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
