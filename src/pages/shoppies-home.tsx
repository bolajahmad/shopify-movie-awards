import { Router } from '@reach/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Menu } from 'react-feather';
import { SearchForm } from '../components';
import { ISearchResult, size } from '../models';
import { MainContent, MovieDetailComponent, NominationsComponent } from './components';
import { ShoppiesPageWrapper } from './styles';

export const ShoppiesPage: React.FC = () => {
  const [searchResult, setSearchResult] = useState<ISearchResult[]>([]);
  const [nominationsList, setNominationsList] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = useCallback(() => (isOpen ? setIsOpen(false) : setIsOpen(true)), [
    isOpen,
  ]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > size.tablet) {
        setIsOpen(true);
      }
    });
  }, []);

  return (
    <ShoppiesPageWrapper>
      <header>
        <div className="navbar">
          <h1 className="title">The Shoppies</h1>

          <div className="nav">
            <SearchForm
              setSearchResult={setSearchResult}
              searchResult={searchResult}
              nominations={nominationsList}
              setNominations={setNominationsList}
            />
          </div>

          <div className="btn_wrapper">
            <button
              className="btn"
              style={{ padding: '0.75em 0.4em' }}
              onClick={() => handleMenu()}>
              <Menu color="pink" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="main">
          <div className="main_wrapper">
            <Router>
              <MainContent
                path="/"
                setNominations={setNominationsList}
                nominations={nominationsList}
                headerComponent={
                  <SearchForm
                    setSearchResult={setSearchResult}
                    searchResult={searchResult}
                    nominations={nominationsList}
                    setNominations={setNominationsList}
                  />
                }
              />
              <MovieDetailComponent
                path="/movie/:id"
                setNominations={setNominationsList}
                nominations={nominationsList}
                headerComponent={
                  <SearchForm
                    setSearchResult={setSearchResult}
                    searchResult={searchResult}
                    nominations={nominationsList}
                    setNominations={setNominationsList}
                  />
                }
              />
            </Router>
            <aside>
              <div
                className="sidebar"
                style={{ display: `${isOpen ? 'block' : 'none'}` }}>
                <div className="nominations">
                  <div className="form_wrapper">
                    <SearchForm
                      setSearchResult={setSearchResult}
                      searchResult={searchResult}
                      nominations={nominationsList}
                      setNominations={setNominationsList}
                    />
                  </div>
                  <h3 className="center">nominations</h3>
                  {nominationsList.length < 5 ? (
                    <p className="alert_box info">
                      you have made {nominationsList.length} nominations
                    </p>
                  ) : (
                    <p className="alert_box success">
                      you have successfully nominated 5 movies
                    </p>
                  )}
                  <ul>
                    <NominationsComponent nominations={nominationsList} />
                  </ul>
                </div>
              </div>
            </aside>
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
};
