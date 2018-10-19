import React from 'react';
import { createResource } from 'react-cache';
import styled from 'styled-components';
import { cache } from '../cache';
import * as api from '../api';

const Username = styled.span`
  color: #20a464;
`;
const Repo = styled.div`
  margin-bottom: 10px;
`;
const Title = styled.h2`
  color: #048bfb;
`;
const readRepos = createResource((username = '') => {
  return api.searchRepos(username);
})

const Repos = ({ detailId }) => {
  const repos = readRepos.read(cache, detailId);
  return (
    <>
      <h1><Username>{detailId}</Username>'s Repo</h1>
      {
        repos.map(({ id, name, forks_count, stargazers_count, watchers_count, html_url }) => (
          <Repo key={id}>
            <Title>{name} <a href={html_url}><span role="img" aria-label="Right">👉</span></a></Title>
            <span>Watch: {watchers_count} </span>
            <span>Fork: {forks_count} </span>
            <span>Star: {stargazers_count} </span>
          </Repo>
        ))
      }
    </>
  )
}

export default Repos;
