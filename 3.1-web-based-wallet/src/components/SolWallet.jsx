import { useState } from "react";
import { mnemonicToSeed, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  return (
    <div>
      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          console.log("seed: ",seed, "mnemonic: ",mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setPublicKeys([...publicKeys, keypair.publicKey]);
        }}
        className="bg-blue-600 px-2 py-1 cursor-pointer text-white rounded-md mt-8"
      >
        Add SOL wallet
      </button>
    {publicKeys.length>0 &&
      <div className="flex flex-col  space-y-2 mt-8 bg-violet-950 p-2 border rounded-md border-gray-500  text-white">
      {publicKeys.map((p,ind) => (
        <div key={ind} className="">{p.toBase58()}</div>
      ))}
    </div>
    }
    </div>
  );
}
