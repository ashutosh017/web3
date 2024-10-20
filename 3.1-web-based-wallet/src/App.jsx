import { generateMnemonic } from "bip39";
import { useEffect, useState } from "react";
import { SolanaWallet } from "./components/SolWallet";
import { EthWallet } from "./components/EthWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [isDisabled, setIsDisabled] = useState(false); // State to disable button

  useEffect(() => {
    const savedMnemonic = localStorage.getItem("mnemonic");
    if (savedMnemonic) {
      setMnemonic(savedMnemonic);
      setIsDisabled(true); // Disable the button if mnemonic exists
    }
  }, []);

  return (
    <div className="px-4 py-8 bg-purple-950 min-h-screen">
      <button
        className={`px-4 py-2 rounded-md text-white ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }`}
        onClick={async function () {
          if (!isDisabled) {
            const mn = await generateMnemonic();
            setMnemonic(mn);
            localStorage.setItem("mnemonic", mn); // Store new mnemonic in localStorage
            setIsDisabled(true); // Disable the button after mnemonic is generated
          }
        }}
        disabled={isDisabled} // Disable the button conditionally
      >
        Generate Mnemonic
      </button>

      {mnemonic && (
        <>
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

          <SolanaWallet mnemonic={mnemonic} />
          <EthWallet mnemonic={mnemonic} />
        </>
      )}
    </div>
  );
}

export default App;
