import { useEffect, useState } from "react";
import { mnemonicToSeed, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import Card from "./Card";
import handleDelete from "../handlers/handleDelete";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);
  const getBalance = async (publicKey, setBalance) => {
    console.log("1: ", publicKey);
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log("2: ");
    const publicKey2 = new PublicKey(
      publicKey
    );
    const balance = await connection.getBalance(publicKey2);
    setBalance(balance / Number(1e9));
    console.log("balance: ", balance);
  };
  useEffect(() => {
    const x = localStorage.getItem("solPubKeys");
    console.log(typeof x);
    console.log(x);
    if (!x) return;
    const y = x.split(",");
    console.log("y: ", y, "typeof Y: ", typeof y);
    setPublicKeys([...y]);
  }, []);
  const addSolWallet = async function () {
    const seed = await mnemonicToSeed(mnemonic);
    console.log("seed: ", seed, "mnemonic: ", mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setPublicKeys((prevPublicKeys) => {
      const updatedKeys = [...prevPublicKeys, keypair.publicKey.toBase58()];
      localStorage.setItem("solPubKeys", updatedKeys);
      return updatedKeys;
    });
    localStorage.setItem("solPubKeys", [...publicKeys, keypair.publicKey]);
  };

  return (
    <div>
      <button
        onClick={addSolWallet}
        className="bg-blue-600 px-2 py-1 cursor-pointer text-white rounded-md mt-8"
      >
        Add SOL wallet
      </button>

      {publicKeys.length > 0 && (
        <div className="flex flex-col  space-y-2 mt-8 bg-violet-950 p-2 border rounded-md border-gray-500  text-white">
          {publicKeys.map((p, ind) => (
            <div key={ind}>
              <Card p={p} getBalance={getBalance} currency={"SOL"} setState={setPublicKeys} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
