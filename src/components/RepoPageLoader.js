import React from 'react';
import { createResource } from 'react-cache';
import { cache } from '../cache';

const readRepoPage = createResource(() => import(/* webpackChunkName: 'repos' */'./Repos'));

const RepoPageLoader = (props) => {
  const Repos = readRepoPage.read(cache).default;
  return <Repos {...props} />;
};

export default RepoPageLoader;
