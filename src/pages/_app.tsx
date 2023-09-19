import Layout from "@/components/Layout/Layout";
import type { AppProps } from "next/app";
import { Kavoon } from "next/font/google";
import "../styles/globals.scss";

const kavoon = Kavoon({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-content",
  fallback: ["cursive"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={kavoon.variable}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </div>
  );
}

export default MyApp;
