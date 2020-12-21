import {render as rtlRender, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {format} from 'date-fns';
import {SWRConfig} from 'swr';
import {DATE_PICKER_FORMAT} from './utils';
import App from './App';

// TODO - add more tests

const Wrapper = ({children}) => (
  <SWRConfig value={{dedupingInterval: 0}}>{children}</SWRConfig>
);

const render = (ui, options) => rtlRender(ui, {wrapper: Wrapper, ...options});

beforeEach(async () => {
  render(<App />);
  expect(
    screen.getByRole('heading', {name: /forex exchange/i})
  ).toBeInTheDocument();

  // assertions for the date
  const date = screen.getByRole('textbox');
  expect(date.value).toEqual(format(new Date(), DATE_PICKER_FORMAT));

  expect((await screen.findAllByText(/gbp/i)).length).toBeGreaterThan(0);
});

test('Calculates the rate when you change the value in the from input', async () => {
  const [base, quote] = screen.getAllByRole('spinbutton');
  expect(base.value).toEqual('1');
  expect(quote.value).toEqual('7.4393');

  userEvent.clear(base);
  userEvent.type(base, '2');

  expect(base.value).toEqual('2');
  expect(quote.value).toEqual(`${2 * 7.4393}`);
});

test('Calculates the rate when you change the value in the to input', async () => {
  const [base, quote] = screen.getAllByRole('spinbutton');
  expect(base.value).toEqual('1');
  expect(quote.value).toEqual('7.4393');

  userEvent.clear(quote);
  userEvent.type(quote, '2');

  expect(quote.value).toEqual('2');
  expect(base.value).toEqual(`${2 / 7.4393}`);
});

test('Calculates the rate when you click the switch button', async () => {
  let [from, to] = screen.getAllByRole('combobox');
  expect(from.value).toEqual('EUR');
  expect(to.value).toEqual('USD');

  userEvent.click(screen.getByRole('button', {name: ''}));

  [from, to] = screen.getAllByRole('combobox');
  expect(from.value).toEqual('USD');
  expect(to.value).toEqual('EUR');
});
