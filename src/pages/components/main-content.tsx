import { Link, RouteComponentProps } from '@reach/router';
import React, { useCallback, useEffect, useState } from 'react';
import { ThumbsDown, ThumbsUp } from 'react-feather';
import styled from 'styled-components';
import { IMovies } from '../../models';
import { makeCallToApi } from '../../utils';

const Wrapper = styled.section`
  width: 100%;

  .content_wrapper {
    .movie_list {
      display: flex;
      flex-direction: column;
  }
`;

const ProjectWrapper = styled.li`
  padding: 1em 1.5em;

  .item {
    display: flex;
    justify-content: space-between;

    .poster {
      position: relative;
      width: 15em;
      height: auto;

      div {
        position: absolute;
        top: 1%;
        right: 5%;
        background: pink;
        color: white;
        width: 3em;
        height: 3em;
        border-radius: 50%;
        display: grid;
        align-items: center;
        justify-content: center;
      }
    }

    .details {
      flex: 1;
      display: flex;
      align-items: start;

      & > div {
        padding: 0.5em 1em;

        .plot {
          margin-top: 2em;
        }
      }

      .btn_wrapper {
        align-self: center;
        width: 50%;
      }

      .btn {
        padding: 1em 0.5em;
        margin: 0 auto;
        border-radius: 0.5em;
        border: none;
        display: inline-flex;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        font-weight: bold;
        color: white;
        background-color: var(--sec-color);
        transition: all 0.5s ease-in;
        cursor: pointer;

        &:focus,
        &:hover {
          box-shadow: 0 0 3px 2px silver;
        }
      }
    }
  }
`;

interface MainContentProps extends RouteComponentProps {
  setNominations: React.Dispatch<React.SetStateAction<string[]>>;
  nominations: string[];
}

export const MainContent: React.FC<MainContentProps> = ({
  setNominations,
  nominations,
  ...props
}) => {
  const [moviesList, setMoviesList] = useState<IMovies[]>([]);

  useEffect(() => {
    makeCallToApi(`batman`).then((res) => {
      setMoviesList((prev) => [...prev, res]);
    });
  }, []);

  const addNomination = useCallback(
    (id: string) => {
      const index = nominations.findIndex((nom) => nom === id);
      if (index === -1) {
        setNominations((prev) => [...prev, id]);

        return;
      }
      setNominations((prev) => prev.filter((nom) => nom !== id));

      return;
    },
    [nominations, setNominations]
  );

  return (
    <Wrapper>
      <div className="content_wrapper">
        <div className="header"></div>

        <ul className="movie_list">
          {moviesList.length < 1 ? (
            <p>Movies you search will appear here</p>
          ) : (
            moviesList.map((movie, i) => (
              <ProjectWrapper key={movie.imdbID}>
                <div className="item">
                  <div className="poster">
                    <img src={movie.Poster} alt="poster" height="250" />
                    <div>{movie.Rated}</div>
                  </div>

                  <div className="details">
                    <div>
                      <h3 style={{ marginTop: '0' }}>
                        <Link to={`/movie/${movie.imdbID}`}>
                          {movie.Title} ({movie.Year})
                        </Link>
                      </h3>
                      <p className="italic smaller">{movie.Actors}</p>
                      <p>
                        <small>IMDB rating: {movie.imdbRating}/10</small>
                      </p>
                      <p className="plot">{movie.Plot}</p>
                    </div>
                    <div className="btn_wrapper">
                      <button className="btn" onClick={() => addNomination(movie.imdbID)}>
                        {nominations.includes(movie.imdbID) ? (
                          <>
                            <ThumbsDown color="black" />
                            <span>reject</span>
                          </>
                        ) : (
                          <>
                            <ThumbsUp color="pink" />
                            <span>nominate</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </ProjectWrapper>
            ))
          )}
        </ul>
      </div>
    </Wrapper>
  );
};
