import { StrictMode } from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'; // pour React 18 et plus récent
import 'bootstrap/dist/css/bootstrap.min.css';  // <-- ici très important
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
