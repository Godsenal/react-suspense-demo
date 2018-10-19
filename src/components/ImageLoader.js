import React from 'react';
import styled from 'styled-components';
import { createResource } from 'react-cache';
import { cache } from '../cache';

const Img = styled.img`
  border-radius: 10px;
`;

const readImageLoad = createResource(
  src => new Promise(res => {
    const img = new Image();
    img.onload = () => res(src);
    img.src = src;
}));

const ImageLoader = (props) => {
  const src = readImageLoad.read(cache, props.src);
  return <Img {...props} src={src} />;
};

export default ImageLoader;
