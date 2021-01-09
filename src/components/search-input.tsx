import { observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Search } from 'react-feather';

const InputWrapper = styled.label``;

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
        <button>
          <Search className="icon" size={24} />
          <span>Search</span>
        </button>
      </InputWrapper>
    </form>
  );
});
