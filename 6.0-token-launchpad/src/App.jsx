import { TokenLaunchpad } from "./components/TokenLaunchpad";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
  const rpc_url = import.meta.env.VITE_CUSTOM_RPC_URL;
  return (
    <ConnectionProvider endpoint={rpc_url}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className=" p-5 flex flex-col bg-zinc-900 h-screen">
            <div className="flex space-x-2">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <TokenLaunchpad></TokenLaunchpad>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
