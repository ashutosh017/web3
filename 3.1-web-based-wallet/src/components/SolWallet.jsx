import { useEffect, useState } from "react";
import { mnemonicToSeed, mnemonicToSeedSync } from "bip39";
// import { derivePath } from "ed25519-hd-key";
// import {derivePath} from '../../node_modules/ed25519-hd-key/dist/index.js'
import * as ed25519 from 'ed25519-hd-key';
const { derivePath } = ed25519;
// import { Keypair,  clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import {Keypair, clusterApiUrl, Connection, PublicKey} from '../../node_modules/@solana/web3.js/lib/index.esm.js'
import nacl from "tweetnacl";
import Card from "./Card";
import bs58 from 'bs58'

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const[keyPairs, setKeyPairs] = useState([])
  const getBalance = async (publicKey, setBalance) => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const publicKey2 = new PublicKey(
      publicKey
    );
    const bal = await connection.getBalance(publicKey2);
    const balance = (bal / 1e9).toFixed(2);
    setBalance((balance));
  };
  useEffect(() => {
    const x = localStorage.getItem("solKeyPairs");
    if (!x) return;
    const y = JSON.parse(x);
    setKeyPairs([...y]);
  }, []);
  
  const addSolWallet = async function () {
    const seed = await mnemonicToSeed(mnemonic);
    console.log("seed: ", seed, "mnemonic: ", mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setKeyPairs((prevKeyPairs) => {
      const privKey = bs58.encode(keypair.secretKey);
      const updatedKeyPairs = [
        ...prevKeyPairs,
        { publicKey: keypair.publicKey.toBase58(), privateKey: privKey },
      ];
      localStorage.setItem("solKeyPairs", JSON.stringify(updatedKeyPairs));
      return updatedKeyPairs;
    });
  };
  

  return (
    <div>
      <button
        onClick={addSolWallet}
        className="bg-blue-600 hover:bg-blue-700 px-2 py-1 cursor-pointer text-white rounded-md mt-8"
      >
        Add SOL wallet
      </button>

      {keyPairs.length > 0 && (
        <div className="flex flex-col  space-y-2 mt-8 bg-violet-950 p-2 border rounded-md border-gray-500  text-white">
          {keyPairs.map((kp, ind) => (
            <div key={ind}>
              <Card keyPair={{publicKey:kp.publicKey,privateKey:kp.privateKey}} getBalance={getBalance} currency={"SOL"} setState={setKeyPairs} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
