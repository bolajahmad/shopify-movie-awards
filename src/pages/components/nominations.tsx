import React, { useCallback, useEffect, useState } from 'react';
import { Delete } from 'react-feather';
import styled from 'styled-components';
import { IMovies } from '../../models';
import { makeCallToApi } from '../../utils';

const Wrapper = styled.li`
  font-size: 0.85em;

  & > div + div {
    margin-top: 2em;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 2em;
      height: 3em;
    }

    p {
      width: 60%;
    }

    .wrapper {
      width: 3em;

      .btn {
        background: none !important;

        :focus,
        :hover {
          outline: none;
          box-shadow: none;
        }
      }
    }
  }
`;

export const NominationsComponent: React.FC<{
  nominations: string[];
  setNominations: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ nominations, setNominations }) => {
  const [movies, setMovies] = useState<IMovies[]>([]);

  const removeMovie = useCallback(
    (id: string) => {
      setMovies((prev) => prev.filter((movie) => movie.imdbID !== id));
      setNominations((nom) => nom.filter((value) => value !== id));
    },
    [setNominations]
  );

  useEffect(() => {
    const list: IMovies[] = [];

    nominations.forEach((nom) => {
      makeCallToApi(`${nom}`)
        .then((data) => {
          list.push(data);

          return list;
        })
        .then((value) => setMovies((prev) => [...value]))
        .catch((error) => console.log(error));
    });

    if (nominations.length === 0) {
      setMovies((prev) => []);
    }
  }, [nominations, setMovies]);

  console.log(movies);

  return (
    <Wrapper>
      {movies?.map((nom) => (
        <div key={nom?.imdbID}>
          <img src={nom?.Poster} alt="" height="24" width="24" />
          <p className="bold">{nom?.Title}</p>
          <div className="wrapper">
            <button className="btn" onClick={() => removeMovie(nom.imdbID)}>
              <Delete color="rgb(94, 13, 30)" />
            </button>
          </div>
        </div>
      ))}
    </Wrapper>
  );
};
