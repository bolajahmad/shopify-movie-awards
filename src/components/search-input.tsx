import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Search } from 'react-feather';
import styled from 'styled-components';

const InputWrapper = styled.label`
  display: flex;
  position: relative;
  width: 20em;

  .input {
    font: inherit;
    width: 100%;
    padding: 0.5em 1em;
    border: 1px solid hsla(0deg 0% 10% 0.9);
    border-radius: 0.4em;
  }

  .btn {
    position: absolute;
    right: 0;
    color: hsla(0deg 0% 10% 0.9);
    padding: 0.5em 1em 0em;
    border: none;
    background: none;
  }
`;

export const SearchForm: React.FC = observer(() => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { value } = e.target;
    setQuery((prev) => value);
  };

  return (
    <form>
      <InputWrapper>
        <input
          type="search"
          className="input"
          autoComplete="off"
          value={query}
          placeholder="Search for movies to nominate"
          onChange={handleChange}
        />
        <button className="btn">
          <Search className="icon" size={24} />
          <span className="visually-hidden">Search</span>
        </button>
      </InputWrapper>
    </form>
  );
});
