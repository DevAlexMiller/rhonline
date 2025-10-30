import styled from 'styled-components';
import breakpoints from '../../styles/breakpoints';

export const MyPassword = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
`;

export const NewPassword = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
  
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 30vw;
    margin-bottom: 2rem;

    img {
      width: 6vw;
      height: 13vh;
    }

    .labels {
      flex: 1;

      p {
        font-size: 1rem;
        margin: 0;
      }

      hr {
        border: none;
        border-bottom: 0.0625rem solid #000;
        margin: 0.25rem 0 0.75rem;
      }
    }
  }

  .rhLogo {
    width: 25vw;
    height: 25vh;
    object-fit: contain;
    display: block;
    margin: 0 auto 2rem auto;
    align-items: center;
  }

  @media ${breakpoints.sm}{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    overflow-y: auto;
  
    .user-info {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      max-width: 60vw;
      margin-bottom: 15rem;
      img {
        width: 12vw;
        height: 10vh;
      }

      .labels {
        flex: 1;
        margin-top: auto;

        p {
          font-size: 1rem;
          margin: 0;
        }

        hr {
          border: none;
          border-bottom: 0.0625rem solid #000;
          margin: 0.25rem 0 0.75rem;
        }
      }
    }

    .rhLogo {
      width: 25vw;
      height: 25vh;
      object-fit: contain;
      display: block;
      margin: 0 auto 0 auto;
      align-items: center;
    }
  }
`;