import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { AuthProvider } from './components/auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
