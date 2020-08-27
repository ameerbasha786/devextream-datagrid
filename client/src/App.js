import React from 'react';
import './App.css';
import Axios from 'axios';
import OrderTable from './components/ordertable'

Axios.defaults.baseURL='http://localhost:8080';
function App() {
  return(
<OrderTable />
  );
}

export default App;
