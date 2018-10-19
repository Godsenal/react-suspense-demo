import styled from 'styled-components';

const Button = styled.button`
  border: 1px solid #7c8194;
  border-radius: 10px;

  color: #7c8194;
  background-color: inherit;
  padding: 10px 20px;
  outline: none;
  opacity: 0.7;
  cursor: pointer;
  
  &:hover {
    opacity: 1;
    transition: opacity 0.1s;
  }
`;

export default Button;
