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
import Airdrop from "./components/Airdrop";
import SolBalance from "./components/SolBalance";
import { SignMessage } from "./components/SignMessage";

const rpc_url = import.meta.env.VITE_CUSTOM_RPC_URL;
// console.log(rpc_url);
function App() {
  return (
    <div className="p-8 bg-zinc-950 text-white h-screen">
      <ConnectionProvider
        endpoint={
          rpc_url
        }
      >
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="flex space-x-2">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <SolBalance />
          <div className="flex flex-col space-y-4">
          <Airdrop />
          <SignMessage/>
          </div>

          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
