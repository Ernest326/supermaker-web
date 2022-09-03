import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { hop } from "@onehop/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';


hop.init({
	projectId: "project_NTAzMTk3MDc5ODI0MjI0NjE" // replace with your project ID
});
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
