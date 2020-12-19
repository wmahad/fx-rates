import {ErrorBoundary} from 'react-error-boundary';
import FXApp from './main';
import {ErrorFallback} from './components';
import {Main} from './styled';

export default function App() {
  return (
    <Main>
      <h1>Forex Exchange</h1>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <FXApp />
      </ErrorBoundary>
    </Main>
  );
}
