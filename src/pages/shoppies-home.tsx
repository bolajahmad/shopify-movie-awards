import { Router } from '@reach/router';
import React, { useState } from 'react';
import { SearchForm } from '../components';
import { ISearchResult } from '../models';
import { MainContent, MovieDetailComponent, NominationsComponent } from './components';
import { ShoppiesPageWrapper } from './styles';

export const ShoppiesPage: React.FC = () => {
  const [searchResult, setSearchResult] = useState<ISearchResult[]>([]);
  const [nominationsList, setNominationsList] = useState<string[]>([]);

  return (
    <ShoppiesPageWrapper>
      <header>
        <div className="navbar">
          <h1 className="title">The Shoppies</h1>

          <div>
            <SearchForm
              setSearchResult={setSearchResult}
              searchResult={searchResult}
              nominations={nominationsList}
              setNominations={setNominationsList}
            />
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
              />
              <MovieDetailComponent
                path="/movie/:id"
                setNominations={setNominationsList}
                nominations={nominationsList}
              />
            </Router>
            <aside>
              <div className="sidebar">
                <div className="nominations">
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
