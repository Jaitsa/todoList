import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import RegisterPage from '../registerPage/RegisterPage';
import LoginPage from '../loginPage/LoginPage';
import TodoList from '../todoList/TodoList';
import { useAuth } from '../auth/AuthContext';

import './App.css';

function App() {
  const { token } = useAuth();

  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Routes>
          <Route exact path="/" element={<RegisterPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/todo" element={token ? <div className="todoComponent"><TodoList /></div> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
