import React, { lazy, Suspense } from 'react';
// import { Provider } from 'react-redux';
import { Header } from './Header';
import { HomePage } from './HomePage';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { fontFamily, fontSize, gray2 } from './Styles';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';
import { NotFoundPage } from './NotFoundPage';
import { QuestionPage } from './QuestionPage';
import { SignOutPage } from './SignOutPage';
import { AuthProvider } from './Auth';
import { AuthorizedPage } from './AuthorizedPage';

const AskPage = lazy(() => import('./AskPage'));

// Create a separate component for the ask page with Suspense
const AskPageWithSuspense = () => (
  <Suspense
    fallback={
      <div
        css={css`
          margin-top: 100px;
          text-align: center;
        `}
      >
        Loading...
      </div>
    }
  >
    <AuthorizedPage>
      <AskPage />
    </AuthorizedPage>
  </Suspense>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            color: ${gray2};
          `}
        >
          <Header />

          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/ask" element={<AskPageWithSuspense />} />
            <Route path="/signin" element={<SignInPage action="signin" />} />
            <Route
              path="/signin-callback"
              element={<SignInPage action="signin-callback" />}
            />
            <Route path="/signout" element={<SignOutPage action="signout" />} />
            <Route
              path="/signout-callback"
              element={<SignOutPage action="signout-callback" />}
            />
            <Route path="/questions/:questionId" element={<QuestionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
