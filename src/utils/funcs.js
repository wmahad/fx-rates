import {format, subDays} from 'date-fns';
import {API_URL, DATE_FORMAT} from './constants';

export const fetcher = (url) => fetch(url).then((r) => r.json());

export const generateUri = (base, date) => {
  return `${API_URL}${format(date, DATE_FORMAT)}${base ? `?base=${base}` : ''}`;
};

export const generateHistoryUri = (date, base, quote, days) => {
  const startDate = format(subDays(date, days), DATE_FORMAT);
  const endDate = format(date, DATE_FORMAT);
  return `${API_URL}history?base=${base}&start_at=${startDate}&end_at=${endDate}${
    quote ? `&symbols=${quote}` : ''
  }`;
};

const defaultData = {
  labels: [],
  datasets: [
    {
      label: '',
      lineTension: 0.1,
      data: [],
      fill: false,
      backgroundColor: '#256eff',
      borderColor: '#0080ff',
      hitRadius: 2,
      borderWidth: 2,
    },
  ],
};

export const getHistoricalRates = (data = {}, quote) => {
  const {rates: dataSets = {}, base} = data;
  const rates = Object.entries(dataSets).reduce((acc, [key, rate]) => {
    return {...acc, [key]: rate[quote]};
  }, {});
  return {base, rates};
};

export const generateDataSets = (data, quote) => {
  if (!data) return defaultData;
  const {base, rates} = getHistoricalRates(data, quote);
  return {
    ...defaultData,
    labels: Object.keys(rates),
    datasets: defaultData.datasets.map((line) => {
      return {
        ...line,
        label: `${base}/${quote}`,
        data: Object.values(rates),
      };
    }),
  };
};
