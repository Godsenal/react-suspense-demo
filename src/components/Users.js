import React from 'react';
import { createResource } from 'react-cache';
import styled from 'styled-components';
import { Button, ImageLoader, Spinner } from '.';
import { cache } from '../cache';
import * as api from '../api';

const User = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;
const Name = styled.div`
  flex: 1 0;
  font-size: 20px;
  margin-left: 24px;
`;
const readUsers = createResource((search = '') => {
  return api.searchUsers(search);
})
const Users = ({ detailId, handleDetail, search }) => {
  const users = readUsers.read(cache, search);
  return (
    <div>
      { users.length <= 0 && <h2>No Result for {search}</h2>}
      {
        users.map((user) => {
          const { id, avatar_url, login } = user;
          return (
            <User key={id} onClick={() => handleDetail(login)}>
              <ImageLoader src={avatar_url} alt="avatar" width={50} />
              <Name>{login}</Name>
              { detailId === login ?
                <Spinner /> :
                <Button>REPO <span role="img" aria-label="Right">👉</span></Button>
              }
            </User>
          )
        })
      }
    </div>
  )
}

export default Users;
