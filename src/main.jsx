import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import { I18nProvider } from "./i18n/index.jsx";
import { initAnalytics } from "./lib/analytics.js";
import "./index.css";

// Off unless VITE_GOATCOUNTER_CODE is set. Cookieless, and skipped for Do Not Track.
initAnalytics();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </I18nProvider>
  </StrictMode>,
);
