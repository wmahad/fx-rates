import styled from '@emotion/styled';
import Picker from 'react-datepicker';

export const Main = styled.div`
  margin: 0 auto;
  padding: 4em 2em;
  max-width: 840px;
  width: 100%;
  text-align: center;
  color: #6e6e6e;
`;

export const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Results = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

export const DatePicker = styled(Picker)`
  margin: 1rem 0;
  border: 1px solid #e2e8f0;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 0.875rem;
  cursor: pointer;
  height: 2.5rem;
  line-height: 1.1;
  background-color: #fff;
  color: inherit;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

  &:hover {
    border-color: #cbd5e0;
  }

  &:focus {
    outline-color: #0080ff;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 0.875rem;
  cursor: pointer;
  height: 2.5rem;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  color: inherit;
  appearance: none;

  &:hover {
    border-color: #cbd5e0;
  }

  &:focus {
    outline-color: #0080ff;
  }

  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`;

export const Button = styled.button`
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease 0s;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  outline: none;
  width: auto;
  line-height: 1.2;
  border-radius: 0.375rem;
  font-weight: 600;
  height: 2rem;
  font-size: 0.75rem;
  padding: 0 0.75rem;
  background: #3f8efc;
  color: #fff;
  border: 0;

  &:hover {
    background: #0496ff;
  }

  &:active {
    background: #2667ff;
  }
`;

export const Switch = styled(Button)`
  background: #e9ecef;
  margin: 0 1rem;

  &:hover {
    background: #cbd5e0;
  }

  &:active {
    background: #ced4da;
  }

  span {
    &::before {
      content: '';
      border: solid #6e6e6e;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
      transform: rotate(135deg);
    }
    &::after {
      content: '';
      border: solid #6e6e6e;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
      transform: rotate(-45deg);
    }
  }
`;
