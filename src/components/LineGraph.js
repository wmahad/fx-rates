import styled from '@emotion/styled';
import useSWR from 'swr';
import {useState} from 'react';
import {Line} from '@reactchartjs/react-chart.js';
import {Button} from '../styled';
import {fetcher, generateHistoryUri, generateDataSets} from '../utils';

const Buttons = styled.div`
  text-align: left;
  button {
    margin-right: 0.5rem;
  }
`;

export function FallbackLine() {
  return <Line data={generateDataSets()} />;
}

export default function LineGraph({date, base, quote}) {
  const [days, setDays] = useState(30);

  const uri = generateHistoryUri(date, base, quote, days);
  const {data} = useSWR(uri, fetcher);
  const dataSets = generateDataSets(data, quote);
  return (
    <div>
      <Buttons>
        <Button type="button" onClick={() => setDays(30)}>
          30 days
        </Button>
        <Button type="button" onClick={() => setDays(60)}>
          60 days
        </Button>
        <Button type="button" onClick={() => setDays(90)}>
          90 days
        </Button>
      </Buttons>
      <Line data={dataSets} />
    </div>
  );
}
