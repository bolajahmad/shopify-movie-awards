import { RouteComponentProps } from '@reach/router';
import React, { useCallback, useEffect, useState } from 'react';
import { ThumbsDown, ThumbsUp } from 'react-feather';
import styled from 'styled-components';
import { device, IMovies } from '../../models';
import { makeCallToApi } from '../../utils';

const WrapperStyles = styled.section`
  min-width: 70%;
  min-height: 90vh;

  .header {
    display: none;
  }

  .wrapper {
    padding: 1.5em 2em;

    .img_wrapper {
      float: left;
      min-width: 20em;
      max-width: 100%;
      height: 20em;

      img {
        height: 20em;
      }
    }

    .detail_wrapper {
      padding: 0em 2em;
      overflow: hidden;

      & > * + * {
        margin-top: 2em;
      }

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > h3 {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }

        .btn_wrapper {
          width: 10em;
        }
      }
    }

    .detail_wrapper .review_list {
      h3 {
        color: var(--primary-color);
      }

      & li + li {
        margin-top: 0.5em;
        border-top: 1px solid rgb(97, 97, 97);
      }
      li {
        display: flex;
        align-items: center;
        padding: 1em 0;
        justify-content: space-between;
      }
    }
  }

  @media screen and ${device.tablet} {
    width: 70%;
    margin: auto;
    .wrapper {
      .img_wrapper {
        float: none;
      }

      .detail_wrapper {
        clear: both;
        padding: 1em 0;
      }
    }
  }

  @media screen and ${device.mobileL} {
    width: 100%;
    padding: 1em 2em;

    .header {
      margin: 0 auto;
      max-width: 100%;
      padding: 0 1em;
      display: block;
    }
  }
`;

interface MovieDetailProps extends RouteComponentProps {
  setNominations: React.Dispatch<React.SetStateAction<string[]>>;
  nominations: string[];
  id?: string;
  headerComponent?: React.ReactNode;
}

export const MovieDetailComponent: React.FC<MovieDetailProps> = ({
  setNominations,
  nominations,
  id,
  headerComponent,
}) => {
  const [movieDetail, setMovieDetail] = useState<IMovies | null>(null);
  console.log(id);

  useEffect(() => {
    makeCallToApi(`${id}`, 'id')
      .then((data) => {
        setMovieDetail((prev) => Object.assign({}, prev, data));
      })
      .catch((err) => console.log(err));
  }, [id]);

  const addNomination = useCallback(
    (value: string) => {
      const index = nominations.findIndex((nom) => nom === value);
      if (index === -1) {
        setNominations((prev) => [...prev, value]);

        return;
      }
      setNominations((prev) => prev.filter((nom) => nom !== value));

      return;
    },
    [nominations, setNominations]
  );

  return (
    <WrapperStyles>
      <div className="header">{headerComponent}</div>
      <div className="wrapper">
        <div className="img_wrapper">
          <img src={movieDetail?.Poster} alt="" />
        </div>

        <div className="detail_wrapper">
          <div className="title">
            <h3>
              {movieDetail?.Title} ({movieDetail?.Year})
            </h3>
            <div className="btn_wrapper">
              <button
                className="btn"
                type="button"
                onClick={() => addNomination(movieDetail?.imdbID as string)}>
                {movieDetail?.imdbID && nominations.includes(movieDetail?.imdbID) ? (
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
          <p>
            duration: <small>{movieDetail?.Runtime}</small>
          </p>
          <p>genre: {movieDetail?.Genre}</p>
          <p>cast: {movieDetail?.Actors}</p>
          <p>{movieDetail?.Plot}</p>

          <div className="review_list">
            <h3>Ratings</h3>
            <ul>
              {movieDetail?.Ratings.map((rating, index) => (
                <li key={index}>
                  <span className="bold">{rating?.Source}:</span>
                  <span>{rating?.Value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WrapperStyles>
  );
};
