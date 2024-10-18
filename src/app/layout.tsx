import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import { inter, nunito, syne } from "./fonts";
import Topbar from "@/components/Topbar/Topbar";
import { WagmiProvider } from "wagmi";
import { config } from "@/config/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${inter.variable} ${nunito.variable}`}>
        <AppRouterCacheProvider
          options={{
            key: "mui",
            prepend: true,
          }}
        >
          <ThemeProvider theme={theme}>
            <Providers>
              <Topbar />
              {children}
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
