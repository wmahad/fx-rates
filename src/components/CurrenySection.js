import styled from '@emotion/styled';
import Select from './Select';
import {Input} from '../styled';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;

  input {
    margin-top: 0.5rem;
  }
`;

export default function CurrencySection({
  amount,
  currency,
  currencies,
  name,
  onCurrencyChange,
  onAmountChange,
}) {
  return (
    <Wrapper>
      <Select
        options={currencies}
        value={currency}
        onChange={onCurrencyChange}
      />
      <Input
        type="number"
        name={name}
        value={amount}
        min={0}
        onChange={onAmountChange}
      />
    </Wrapper>
  );
}
