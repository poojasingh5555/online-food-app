import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./component/CartContext.jsx";

createRoot(document.getElementById('root')).render(
<CartProvider>

    <App /> 
</CartProvider>
 


   

   
 
)
