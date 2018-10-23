import React, { unstable_Suspense as Suspense } from 'react';
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
  return (
    <Suspense maxDuration={1500} fallback={<Img {...props} />}>
      <Img {...props} src={src} />
    </Suspense>
  );
};

export default ImageLoader;
