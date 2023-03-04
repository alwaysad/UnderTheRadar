import '../globals.css'
import Layout from '../components/layout'
import { AuthContextProvider } from '../context/authContext'
export default function MyApp({ Component, pageProps }) {
    return <>
    <AuthContextProvider>
    <Layout>
    
    <Component {...pageProps} />
    </Layout>
    </AuthContextProvider>
    </>
  }
  