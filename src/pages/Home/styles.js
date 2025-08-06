import styled from 'styled-components';

export const HomePage = styled.div`
  display: flex;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
`;

export const MyGrid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow: auto;

  img {
    width: 25vw;
    height: 25vh;
    object-fit: contain;
    display: block;
    margin: 0 auto 2rem auto;
    align-items:center;
  }
`;
