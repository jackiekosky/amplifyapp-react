import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from './routes'; 



Amplify.configure(config);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Router>
  <Switch />
</Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
