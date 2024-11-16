import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PizzaContext from './context/PizzaContext.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <PizzaContext>
        <Provider store={store}>
          <App />
        </Provider>
      </PizzaContext>
    </QueryClientProvider>
  </BrowserRouter>,
)
