import HistoryRouter from '../../components/history-router/history-router';
import { MemoryHistory, createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { ReactNode } from 'react';

export function withHistory(component: ReactNode, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HelmetProvider>
      <HistoryRouter history={memoryHistory}>
        {component}
      </HistoryRouter>
    </HelmetProvider>
  );
}
