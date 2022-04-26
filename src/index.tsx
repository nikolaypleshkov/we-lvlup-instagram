import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "redux/store";
import { PersistGate } from "redux-persist/integration/react";


const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(

    <Provider store={store.store}>
        <PersistGate persistor={store.persistor}>

        </PersistGate>
        <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
        </React.StrictMode>
    </Provider>
);