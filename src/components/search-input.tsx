import { Link } from '@reach/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Search, ThumbsDown, ThumbsUp } from 'react-feather';
import styled from 'styled-components';
import { ISearchResult } from '../models';
import { makeCallToApi, useDebounce } from '../utils';

const InputWrapper = styled.label`
  display: flex;
  position: relative;
  width: 100%;

  .input {
    font: inherit;
    width: 100%;
    padding: 0.5em 1em;
    border: 1px solid hsl(0deg 0% 10%);
    border-radius: 0.4em;
    color: initial;
    background: none;
    transition: all 0.5s ease-in;

    &:focus,
    &:hover {
      background-color: white;
      color: var(--primary-color);

      + .btn {
        display: none;
        position: relative;
      }
    }
  }

  .btn_wrapper {
    position: absolute;
    right: 0;

    .btn {
      color: hsla(0deg 0% 10% 0.9);
      padding: 0.5em 1em 0em;
      border: none;
      background: none;

      &:hover {
        box-shadow: none;
        outline: none;
      }
    }
  }
`;

const Wrapper = styled.ul`
  position: absolute;
  z-index: 100;
  background: var(--bg-color);
  width: 100%;
  height: 20em;
  overflow: auto;

  li {
    display: flex;
    align-items: center;
    padding: 0.5em 1em;

    > * + * {
      margin-left: 1em;
    }

    p {
      width: 60%;
    }

    img {
      width: 3em;
      height: 3em;
    }

    .btn {
      padding: 0.75em 1em;
    }
  }
`;

export const SearchForm: React.FC<{
  setSearchResult: React.Dispatch<React.SetStateAction<ISearchResult[]>>;
  searchResult: ISearchResult[];
  nominations: string[];
  setNominations: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ setSearchResult, searchResult, nominations, setNominations }) => {
  const [query, setQuery] = useState<string>('');

  const debouncedQuery = useDebounce(query, 2000) as string;

  const searchMovies = useCallback(() => {
    if (debouncedQuery.length >= 3) {
      makeCallToApi(debouncedQuery, 'search').then((data) => {
        const search = data.Search as ISearchResult[];
        setSearchResult((prev) => [...search]);
      });
    }
  }, [debouncedQuery, setSearchResult]);

  useEffect(() => {
    searchMovies();
  }, [searchMovies]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { value } = e.target;
    setQuery((prev) => value);
  };

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
    <form style={{ position: 'relative', width: '100%' }}>
      <InputWrapper>
        <input
          type="search"
          className="input"
          autoComplete="off"
          value={query}
          placeholder="Search for movies to nominate"
          onChange={handleChange}
        />
        <button className="visually-hidden" type="submit">
          submit
        </button>
        <div className="btn_wrapper">
          <div className="btn">
            <Search className="icon" color="black" size={24} />
            <span className="visually-hidden">Search</span>
          </div>
        </div>
      </InputWrapper>
      {debouncedQuery.length > 2 && (
        <Wrapper>
          {searchResult.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt="" height="36" width="36" />
              <p>
                <Link to={`movie/${movie.imdbID}`}>
                  {movie.Title} ({movie.Year})
                </Link>
              </p>
              <div className="btn_wrapper">
                <button
                  className="btn"
                  onClick={() => addNomination(movie.imdbID)}
                  type="button">
                  {nominations.includes(movie.imdbID) ? (
                    <ThumbsDown color="black" />
                  ) : (
                    <ThumbsUp color="pink" />
                  )}
                </button>
              </div>
            </li>
          ))}
        </Wrapper>
      )}
    </form>
  );
};
