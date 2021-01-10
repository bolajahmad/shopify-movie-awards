import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { store } from '../../store';

const Wrapper = styled.section`
  .content_wrapper {
    .movie_list {
      display: flex;
      flex-direction: column;

      .movie_list_item .movie_wrapper {
        display: flex;
        align-items: center;

        .movie_poster {
          width: 250px;
          height: 300px;
        }
      }
    }
  }
`;

export const MainContent: React.FC = observer(() => {
  const movies = store.movies.movies;

  return (
    <Wrapper>
      <div className="content_wrapper">
        <div className="header"></div>

        <ul className="movie_list">
          {movies?.map((movie, i) => (
            <li className="movie_list_item" key={i}>
              <div className="movie_wrapper">
                <div className="movie__poster">
                  <img src={movie.Poster} alt="poster" />
                  <div>{movie.Rated}</div>
                </div>

                <div className="movie_details">
                  <div>
                    <h3>
                      {movie.Title}; {movie.Year}
                    </h3>
                    <p>{movie.Actors}</p>
                  </div>
                  <button className="btn">
                    <span>nominate</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
});
