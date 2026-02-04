import { FC, ReactNode, Fragment } from 'react';
import { Page } from './Page';
import { useAuth } from './Auth';

interface Props {
  children?: ReactNode;
}

export const AuthorizedPage: FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Fragment>{children}</Fragment>;
  } else {
    return <Page title="You do not have access to this page" />;
  }
};
