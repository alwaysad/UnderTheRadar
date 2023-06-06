import "../globals.css";
import Layout from "../components/layout";
import { AuthContextProvider } from "../context/authContext";

import { BusinessContextProvider } from "../context/businessContext";
import { CommentContextProvider } from "../context/commentContext";
import { UserContextProvider } from "../context/userContext";

import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <UserContextProvider>
            <BusinessContextProvider>
              <CommentContextProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </CommentContextProvider>
            </BusinessContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
