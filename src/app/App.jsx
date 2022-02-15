import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import filter from 'leo-profanity';
import { injectStyle } from 'react-toastify/dist/inject-style';
import ChatPage from '../pages/ChatPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegistrationPage from '../pages/RegistrationPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Layout from '../components/Layout.jsx';
import PrivateRoute from '../components/private-route/PrivateRoute.jsx';

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
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
