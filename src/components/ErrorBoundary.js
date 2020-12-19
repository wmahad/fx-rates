import styled from '@emotion/styled';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: red;
`;

export default function ErrorFallback({error}) {
  return (
    <Main role="alert">
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </Main>
  );
}
