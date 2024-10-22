"use client";
import { config } from "@/config/wagmiConfig";
import ProtocolProvider from "@/context/Provider";
import store from "@/state";
import Updaters from "@/state/Updaters";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Provider } from "react-redux";
import { WagmiProvider } from "wagmi";
import Popups from "./Popups";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Provider store={store}>
            <Updaters />
            <ProtocolProvider>
              <SnackbarProvider
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                maxSnack={2}
              >
                <Popups />
                {children}
              </SnackbarProvider>
            </ProtocolProvider>
          </Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
