import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskManager from './components/TaskManager';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <TaskManager />
      </div>
    </QueryClientProvider>
  );
}

export default App;
