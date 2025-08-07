import styled from 'styled-components';

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
    align-items: flex-start;
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

  .input {
  width: 100%;
  max-width: 60vw;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .input-group {
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
      text-align: left;
      margin-left: 30vh;
    }

    .input-field {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  button {
    align-self: center;
    width: fit-content;
  }
}

}

`;
