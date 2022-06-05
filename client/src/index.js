import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BasketStoreStore from "./store/BasketStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)

root.render(
      <Context.Provider value={{
          user: new UserStore(),
          application: new DeviceStore(),
          basket: new BasketStoreStore(),
      }}>
          <App />
      </Context.Provider>

);
reportWebVitals();
