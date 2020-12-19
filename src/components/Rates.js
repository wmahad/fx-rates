import styled from '@emotion/styled';

const Heading = styled.h3`
  font-weight: 400;
`;

const Wrapper = styled.div`
  text-align: left;
  margin-left: 1.5rem;
`;

const List = styled.ul`
  padding: 0;
  list-style: none;
  font-size: 0.75rem;
`;

export default function Rates({rates, base, quote}) {
  return (
    <Wrapper>
      <Heading>Rates</Heading>
      <List>
        {Object.entries(rates).map(([rate, value]) => {
          if (rate === quote || rate === base) return null;
          const key = `${base}/${rate}`;
          return (
            <li key={key}>
              {key} - {value}
            </li>
          );
        })}
      </List>
    </Wrapper>
  );
}
