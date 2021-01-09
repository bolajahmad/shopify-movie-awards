import React from 'react';
import { observer } from 'mobx-react';
import { ShoppiesPageWrapper } from './styles';
import { SearchForm } from '../components';

export const ShoppiesPage: React.FC = observer(() => {
  return (
    <ShoppiesPageWrapper>
      <header>
        <div className="navbar">
          <h1 className="title">The Shoppies</h1>

          <div>
            <SearchForm />
          </div>
        </div>
      </header>
    </ShoppiesPageWrapper>
  );
});
