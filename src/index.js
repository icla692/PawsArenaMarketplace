import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "@nfid/identitykit/react/styles.css";
import { InternetIdentity, NFIDW, Plug } from "@nfid/identitykit";
import { IdentityKitProvider } from "@nfid/identitykit/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <IdentityKitProvider
      signers={[NFIDW]}
      featuredSigner={[NFIDW]}
      signerClientOptions={{
        maxTimeToLive: 28800000000000, //8 hours
        idleOptions: {
          idleTimeout: 2147483647, // 24 days
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </IdentityKitProvider>
);
