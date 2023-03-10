import '@/styles/globals.css'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain="ethereum">
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}
