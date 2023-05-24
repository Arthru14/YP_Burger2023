import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import thunk from "redux-thunk";
import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";
import { Provider, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./components/app/app";
import { rootReducer } from "./services/reducers/index";
import { ProvideAuth } from "./services/auth";

const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

export type AppDispatch = typeof store.dispatch;
export type TAppStore = typeof store;

export const useAppDispatch = () => useDispatch<AppDispatch>();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ProvideAuth>
      <Provider store={store}>
        <Router>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </Router>
      </Provider>
    </ProvideAuth>
  </React.StrictMode>
);

reportWebVitals();
