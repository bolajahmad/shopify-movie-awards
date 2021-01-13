import { RouteComponentProps } from '@reach/router';
import React, { useCallback, useEffect, useState } from 'react';
import { ThumbsDown, ThumbsUp } from 'react-feather';
import styled from 'styled-components';
import { IMovies } from '../../models';
import { makeCallToApi } from '../../utils';

const WrapperStyles = styled.section`
  min-width: 70%;
  min-height: 90vh;

  .wrapper {
    padding: 1.5em 2em;

    .img_wrapper {
      float: left;
      width: 20em;
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

        .btn_wrapper {
          width: 10em;
        }
      }
    }
  }
`;

interface MovieDetailProps extends RouteComponentProps {
  setNominations: React.Dispatch<React.SetStateAction<string[]>>;
  nominations: string[];
  id?: string;
}

export const MovieDetailComponent: React.FC<MovieDetailProps> = ({
  setNominations,
  nominations,
  id,
}) => {
  const [movieDetail, setMovieDetail] = useState<IMovies | null>(null);
  console.log(id);

  useEffect(() => {
    makeCallToApi(`${id}`, 'id').then((data) => {
      setMovieDetail((prev) => Object.assign({}, prev, data));
    });
  }, [id]);

  const addNomination = useCallback(
    (value: string) => {
      const index = nominations.findIndex((nom) => nom === value);
      if (index === -1) {
        setNominations((prev) => [...prev, value]);
        console.log(value);

        return;
      }
      setNominations((prev) => prev.filter((nom) => nom !== value));
      console.log(value);

      return;
    },
    [nominations, setNominations]
  );

  return (
    <WrapperStyles>
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
          <p>{movieDetail?.Genre}</p>
          <p>cast: {movieDetail?.Actors}</p>
          <p>{movieDetail?.Plot}</p>

          <div>
            <h3>Ratings</h3>
            <ul className="review_list">
              {movieDetail?.Ratings.map((rating, index) => (
                <li key={index}>
                  <span className="bold">{rating.Source}:</span>
                  <span>{rating.Value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </WrapperStyles>
  );
};
