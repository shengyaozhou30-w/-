import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Augment the JSX namespace to accept any element.
// This resolves TypeScript errors where elements like 'div', 'mesh', 'group' are not recognized in the environment.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);