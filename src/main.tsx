// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Router } from './routers';
import {
  HashRouter,
} from "react-router-dom";

// import "@arco-design/web-react/dist/css/arco.css";
// import App from '@/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Router />
  </HashRouter>
)
