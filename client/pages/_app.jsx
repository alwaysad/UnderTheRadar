import "../globals.css";
import Layout from "../components/layout";
import { AuthContextProvider } from "../context/authContext";

import { BusinessContextProvider } from "../context/businessContext";
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <BusinessContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BusinessContextProvider>
      </AuthContextProvider>
    </>
  );
}
