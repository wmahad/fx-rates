import 'whatwg-fetch';
import 'canvas';
import '@testing-library/jest-dom/extend-expect';
import {configure} from '@testing-library/react';
import {server} from './test/server';
import {cache} from 'swr';

configure({defaultHidden: true, throwSuggestions: true});

beforeAll(() => server.listen({onUnhandledRequest: 'error'}));
afterAll(() => server.close());
afterEach(() => {
  cache.clear();
  server.resetHandlers();
});
