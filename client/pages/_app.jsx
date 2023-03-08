import "../globals.css";
import Layout from "../components/layout";
import { AuthContextProvider } from "../context/authContext";

import { BusinessContextProvider } from "../context/businessContext";
import { CommentContextProvider } from "../context/commentContext";
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <BusinessContextProvider>
          <CommentContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          </CommentContextProvider>
        </BusinessContextProvider>
      </AuthContextProvider>
    </>
  );
}
