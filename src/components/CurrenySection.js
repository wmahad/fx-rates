import styled from '@emotion/styled';
import Select from './Select';
import {Input} from '../styled';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  text-align: left;

  input {
    margin-top: 0.5rem;
  }

  label {
    font-weight: 700;
    font-size: 0.875rem;
    ::first-letter {
      text-transform: uppercase;
    }
  }
`;

export default function CurrencySection({
  amount,
  currency,
  currencies,
  name,
  onCurrencyChange,
  onAmountChange,
  label,
}) {
  return (
    <Wrapper>
      <label htmlFor={name}>{label}</label>
      <Select
        options={currencies}
        id={name}
        value={currency}
        onChange={onCurrencyChange}
      />
      <Input
        type="number"
        value={amount}
        min={0}
        placeholder="Amount"
        onChange={onAmountChange}
      />
    </Wrapper>
  );
}
