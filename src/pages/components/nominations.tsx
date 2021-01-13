import React, { useEffect, useState } from 'react';
import { Delete } from 'react-feather';
import styled from 'styled-components';
import { IMovies } from '../../models';
import { makeCallToApi } from '../../utils';

const Wrapper = styled.li`
  & > div + div {
    margin-top: 2em;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 3em;
      height: 4em;
    }

    p {
      width: 60%;
    }
  }
`;

export const NominationsComponent: React.FC<{ nominations: string[] }> = ({
  nominations,
}) => {
  const [movies, setMovies] = useState<IMovies[]>([]);

  useEffect(() => {
    const list: IMovies[] = [];

    nominations.forEach((nom) => {
      makeCallToApi(`${nom}`, 'id')
        .then((data) => {
          list.push(data);

          return list;
        })
        .then((value) => setMovies((prev) => [...value]));
    });
  }, [nominations, setMovies]);

  console.log(movies);

  return (
    <Wrapper>
      {movies.map((nom) => (
        <div key={nom.imdbID}>
          <img src={nom.Poster} alt="" height="36" width="36" />
          <p className="bold">{nom.Title}</p>
          <Delete color="rgb(94, 13, 30)" />
        </div>
      ))}
    </Wrapper>
  );
};
