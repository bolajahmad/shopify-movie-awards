import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { SearchForm } from '../components';
import { store } from '../store';
import { MainContent } from './components';
import { ShoppiesPageWrapper } from './styles';

export const ShoppiesPage: React.FC = observer(() => {
  useEffect(() => {
    store.movies.getMovies(`i=tt3896198`);
  }, []);

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

      <main>
        <div className="main">
          <div className="main_wrapper">
            <MainContent />
            <aside className="sidebar"></aside>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer">
          <small>&copy;devthuts inc.</small>
        </div>
      </footer>
    </ShoppiesPageWrapper>
  );
});
