import React, { unstable_Suspense as Suspense, PureComponent } from 'react';
import { unstable_scheduleCallback as schedule } from 'scheduler';
import styled, { createGlobalStyle } from 'styled-components'
import { Button, RepoPageLoader, Search, Spinner, Users } from './components';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    color: #7c8194;
    background-color: #343d46;
  }
`;
const Container = styled.div`
  width: 1000px;
  margin: 2rem auto;
`;
const Title = styled.h1`
  font-size: 48px;
  text-align: center;
  color: white;
`;
class Root extends PureComponent {
  state = {
    detail: false,
    detailId: '',
    search: '',
  }
  clearDetail = () => {
    this.setState({
      detail: false,
      detailId: '',
    });
  }
  handleSearch = (value) => {
    this.setState({
      search: value,
      detail: false,
      detailId: '',
    });
    // 현재 스케쥴된 비동기 작업 마지막으로 스케쥴링함.
    // 중간에 다른 비동기 작업이 들어오면 그 작업을 먼저 하도록해서,
    // 예를 들어, 버튼을 누르면 어떤 비동기 작업을 수행할 때 이 setState가 그 비동기작업 뒤로 스케쥴링 되고,
    // 그 비동기 작업을 마치기 전에 유저가 다른 버튼을 누르면, 그 비동기작업 뒤로 또 다시 스케쥴링됨.

    // Dan abramov의 영화 포스터 예제 같은 경우, 영화를 누르면 detail state가 true로 바뀌면서 그 페이지로 넘어감.
    // 만약 유저가 어느 영화를 누르고 다 로드되기전에 다른 영화를 누르면 detail이 가장 마지막에 스케쥴링 될 필요가 있으므로 이걸 쓰면 됨.
  }
  handleDetail = (username) => {
    this.setState({
      detailId: username,
    });
    schedule(() => this.setState({
      detail: true,
    }));
  }
  render() {
    const { detail, detailId, search } = this.state;
    return (
      <>
        <GlobalStyle />
        <Container>
          <Title>Github User Finder</Title>
          <Search handleSearch={this.handleSearch} />
          {
            detail ?
            <>
              <Button onClick={this.clearDetail}><span role="img" aria-label="Left">👈</span> 뒤로</Button>
              <Suspense ms={3000}>
                {/* Detail Page는 loader를 따로 줬기 때문에, fallback이 필요 없다. */}
                <RepoPageLoader detailId={detailId} />
              </Suspense>
            </> :
            search ?
            <Suspense ms={3000} fallback={<Spinner />}>
              <Users search={search} detailId={detailId} handleDetail={this.handleDetail} />
            </Suspense> :
            null
          }
        </Container>
      </>
    )
  }
}

export default Root;
