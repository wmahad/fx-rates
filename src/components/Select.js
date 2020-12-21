import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas: 'select';
  position: relative;
  align-items: center;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 0.25em;
  font-size: 0.875rem;
  cursor: pointer;
  height: 2.5rem;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

  &::after {
    grid-area: select;
    justify-self: end;
    content: '';
    border: solid #6e6e6e;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    margin-right: 0.5rem;
    transform: rotate(45deg);
  }

  &:hover {
    border-color: #cbd5e0;
  }

  span {
    display: none;
  }

  select {
    grid-area: select;
    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0.25em 0.5em;
    margin: 0;
    width: 100%;
    height: 100%;
    outline: none;
    color: inherit;

    &::-ms-expand {
      display: none;
    }
  }

  select:focus + span {
    display: inline;
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 2px solid #0080ff;
    border-radius: inherit;
  }
`;

export default function Select({options, value, onChange, id}) {
  return (
    <Wrapper>
      <select value={value} onChange={onChange} id={id}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span></span>
    </Wrapper>
  );
}
