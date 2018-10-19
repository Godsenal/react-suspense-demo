import React, { createRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;
const Input = styled.input`
  border: none;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box; 
  
  width: 100%;
  padding: 10px;
  padding-left: 24px;
  margin-bottom: 20px;
  color: inherit;
  background-color: #2b303b;
  font-size: 24px;
`;
const Search = ({ handleSearch }) => {
  let _input = createRef();
  const handleKeyPress = e => e.key === 'Enter' && handleSearch(_input.current.value);
  return (
    <Container>
      <Input ref={_input} placeholder="🔍 Search github user" onKeyPress={handleKeyPress} />
    </Container>
  );
}

export default Search;
