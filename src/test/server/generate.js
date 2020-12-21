export const getFXRates = (date, base) => {
  return {
    rates: {
      CAD: 1.5638,
      HKD: 9.5039,
      KES: 156.4,
      PHP: 58.93,
      USD: 7.4393,
      GBP: 357.24,
      UGX: 26.139,
      AUD: 1.6107,
    },
    date,
    base,
  };
};

export const getFXRatesWithEuros = (date, base) => {
  return {
    rates: {
      CAD: 1.5638,
      HKD: 9.5039,
      KES: 156.4,
      PHP: 58.93,
      EUR: 8.45,
      GBP: 357.24,
      UGX: 26.139,
      AUD: 1.6107,
    },
    date,
    base,
  };
};

// TODO - use faker to generate proper test results
export const getHistoryFXRates = (start_at, end_at, base, quote) => {
  return {
    rates: {
      '2020-12-11': {
        [quote]: 1.5487,
      },
      '2020-12-07': {
        [quote]: 1.5537,
      },
      '2020-11-20': {
        [quote]: 1.5484,
      },
      '2020-12-17': {
        [quote]: 1.5546,
      },
      '2020-11-23': {
        [quote]: 1.553,
      },
      '2020-12-18': {
        [quote]: 1.5638,
      },
    },
    start_at,
    base,
    end_at,
  };
};
