import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import ErrorBoundary from "./components/ErrorBoundary/index.jsx";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);
