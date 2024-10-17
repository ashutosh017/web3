import { generateMnemonic } from "bip39";
import { useState } from "react";
import { SolanaWallet } from "./components/SolWallet";
import { EthWallet } from "./components/EthWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div className="px-4 py-8 bg-purple-950 min-h-screen">
      <button
        className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white"
        onClick={async function () {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </button>

      {mnemonic && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 bg-violet-950 p-4 border rounded-md border-gray-500 text-white">
          {mnemonic.split(" ").map((val, ind) => (
            <div
              key={ind}
              className="p-2 bg-gray-800 rounded-md text-center break-words"
            >
              {val}
            </div>
          ))}
        </div>
      )}

      <SolanaWallet mnemonic={mnemonic} />
      <EthWallet mnemonic={mnemonic} />
    </div>
  );
}

export default App;
