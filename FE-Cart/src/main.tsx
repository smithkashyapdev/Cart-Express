import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
