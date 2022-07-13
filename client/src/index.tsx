import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './default.scss';
import App from 'router/App';
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from 'redux';
import { rootReducer } from "./redux/rootReducer";
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

Modal.setAppElement("#root")

const store = createStore(rootReducer);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer 
        limit = {1}
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
          />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

