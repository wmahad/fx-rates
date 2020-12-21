import {useState, Suspense} from 'react';
import useSWR from 'swr';
import {isBefore} from 'date-fns';
import {CurrencySection, LineGraph, FXRates, FallbackLine} from './components';
import {Section, Switch, DatePicker, Results} from './styled';
import {fetcher, generateUri, DATE_PICKER_FORMAT} from './utils';

const today = new Date();
let currencies = [];

export default function Main() {
  const [date, setDate] = useState(() => today);
  const [base, setBase] = useState(1);
  const [quote, setQuote] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState('EUR');
  const [quoteCurrency, setQuoteCurrency] = useState('USD');

  const uri = generateUri(baseCurrency, date);

  const {error, data = {}} = useSWR(uri, fetcher, {
    onSuccess({rates: ratesObj}) {
      setQuote(updateQuoteAmount(base, ratesObj[quoteCurrency]));
    },
  });

  const {rates = {}, base: baseKey} = data;
  const ratesArray = Object.keys(rates);
  if (!currencies.length && baseKey && ratesArray.length) {
    currencies = [baseKey, ...ratesArray];
  }

  if (error) throw error;

  function switchCurrencies() {
    setQuoteCurrency(baseCurrency);
    setBaseCurrency(quoteCurrency);
  }

  function handleQuoteCurrencyChange(evt) {
    const {value} = evt.target;
    setQuoteCurrency(value);
    setQuote(updateQuoteAmount(base, rates[value]));
  }

  function handleQuoteAmountChange(evt) {
    const {value} = evt.target;
    setQuote(value);
    setBase(value / (rates[quoteCurrency] ?? 1));
  }

  function handleBaseAmountChange(evt) {
    const {value} = evt.target;
    setBase(value);
    setQuote(updateQuoteAmount(value));
  }

  function updateQuoteAmount(value, fxRate = rates[quoteCurrency]) {
    return value * (fxRate ?? 1);
  }

  return (
    <>
      <Section>
        <CurrencySection
          amount={base}
          name="base-currency"
          label="From"
          currencies={currencies}
          currency={baseCurrency}
          onCurrencyChange={(e) => setBaseCurrency(e.target.value)}
          onAmountChange={handleBaseAmountChange}
        />

        <Switch onClick={switchCurrencies}>
          <span />
        </Switch>
        <CurrencySection
          amount={quote}
          label="To"
          name="quote-currency"
          currencies={currencies}
          currency={quoteCurrency}
          onCurrencyChange={handleQuoteCurrencyChange}
          onAmountChange={handleQuoteAmountChange}
        />
      </Section>

      <DatePicker
        selected={date}
        dateFormat={DATE_PICKER_FORMAT}
        onChange={setDate}
        filterDate={(d) => isBefore(d, today)}
      />

      <Results>
        <Suspense fallback={FallbackLine}>
          <LineGraph date={date} base={baseCurrency} quote={quoteCurrency} />
        </Suspense>
        <FXRates rates={rates} base={baseCurrency} quote={quoteCurrency} />
      </Results>
    </>
  );
}
