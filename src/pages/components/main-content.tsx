import { Link, RouteComponentProps } from '@reach/router';
import React, { useCallback, useEffect, useState } from 'react';
import { ThumbsDown, ThumbsUp } from 'react-feather';
import styled from 'styled-components';
import { device, IMovies } from '../../models';
import { makeCallToApi } from '../../utils';

const Wrapper = styled.section`
  width: 100%;

  .content_wrapper {
    .header {
      display: none;
    }

    .movie_list {
      display: flex;
      flex-direction: column;
    }
  }

  @media screen and ${device.mobileL} {
    .content_wrapper {
      .header {
        padding: 0 1em;
        width: 30em;
        max-width: 100%;
        display: block;
      }
    }
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

      img {
        height: 250px;
      }

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
        align-self: start;
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

  @media screen and ${device.tablet} {
    .item {
      display: block;
      max-width: 600px;
      margin: 0 auto;

      .poster {
        width: 100%;

        img {
          height: 350px;
        }
      }
    }
  }
`;

interface MainContentProps extends RouteComponentProps {
  setNominations: React.Dispatch<React.SetStateAction<string[]>>;
  openToast: React.Dispatch<React.SetStateAction<boolean>>;
  nominations: string[];
  headerComponent: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({
  setNominations,
  openToast,
  nominations,
  headerComponent,
  ...props
}) => {
  const [moviesList, setMoviesList] = useState<IMovies[]>([]);

  useEffect(() => {
    makeCallToApi(`tt0096895`).then((res) => {
      setMoviesList((prev) => [...prev, res]);
    });
  }, []);

  const addNomination = useCallback(
    (id: string) => {
      if (nominations.length >= 5) {
        openToast(true);

        return;
      }
      const index = nominations.findIndex((nom) => nom === id);
      if (index === -1) {
        setNominations((prev) => [...prev, id]);

        return;
      }
      setNominations((prev) => prev.filter((nom) => nom !== id));

      return;
    },
    [nominations, setNominations, openToast]
  );

  return (
    <Wrapper>
      <div className="content_wrapper">
        <div className="header">{headerComponent}</div>

        <ul className="movie_list">
          {moviesList?.length < 1 ? (
            <p>Movies you search will appear here</p>
          ) : (
            moviesList?.map((movie, i) => (
              <ProjectWrapper key={movie?.imdbID}>
                <div className="item">
                  <div className="poster">
                    <img src={movie?.Poster} alt="poster" />
                    <div>{movie?.Rated}</div>
                  </div>

                  <div className="details">
                    <div>
                      <h3 style={{ marginTop: '0' }}>
                        <Link to={`/movie/${movie?.imdbID}`}>
                          {movie?.Title} ({movie?.Year})
                        </Link>
                      </h3>
                      <p className="italic smaller">{movie?.Actors}</p>
                      <p>
                        <small>IMDB rating: {movie?.imdbRating}/10</small>
                      </p>
                      <p className="plot">{movie?.Plot}</p>
                    </div>
                    <div className="btn_wrapper">
                      <button
                        className="btn"
                        onClick={() => addNomination(movie?.imdbID)}>
                        {nominations.includes(movie?.imdbID) ? (
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
