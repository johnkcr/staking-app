import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "react-query";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import "../styles/globals.css";
import Layout from "components/layout";

const queryClient = new QueryClient();
function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </Web3ReactProvider>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
