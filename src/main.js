import {useState, Suspense} from 'react';
import useSWR from 'swr';
import {isBefore} from 'date-fns';
import {CurrencySection, LineGraph, FXRates, FallbackLine} from './components';
import {Section, Switch, DatePicker, Results} from './styled';
import {fetcher, generateUri, DATE_PICKER_FORMAT} from './utils';

const today = new Date();

export default function Main() {
  const [date, setDate] = useState(() => today);
  const [base, setBase] = useState(1);
  const [quote, setQuote] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState('');
  const [quoteCurrency, setQuoteCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});

  const uri = generateUri(baseCurrency, date);

  const {error} = useSWR(uri, fetcher, {
    onSuccess({rates: ratesObj, base: baseKey}) {
      const ratesArray = Object.keys(ratesObj);
      const firstCurrency = quoteCurrency || ratesArray[0];
      setCurrencies((arr) => {
        if (arr.length) return arr;
        return [baseKey, ...ratesArray];
      });
      setBaseCurrency(baseKey);
      setQuoteCurrency(firstCurrency);
      setQuote(updateQuoteAmount(base, ratesObj[firstCurrency]));
      setRates(ratesObj);
    },
  });

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
