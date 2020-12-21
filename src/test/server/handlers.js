import {rest} from 'msw';
import {API_URL} from '../../utils';
import {getFXRates, getHistoryFXRates} from './generate';

export const handlers = [
  rest.get(`${API_URL}history`, (req, res, ctx) => {
    const base = req.url.searchParams.get('base') || 'EUR';
    const startAt = req.url.searchParams.get('start_at');
    const endAt = req.url.searchParams.get('end_at');
    const quote = req.url.searchParams.get('symbols') || 'CAD';
    return res(ctx.json(getHistoryFXRates(startAt, endAt, base, quote)));
  }),
  rest.get(`${API_URL}:date`, (req, res, ctx) => {
    const {date} = req.params;
    const base = req.url.searchParams.get('base') || 'EUR';
    return res(ctx.json(getFXRates(date, base)));
  }),
];
