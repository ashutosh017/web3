import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export default function Airdrop(){
    const [amount, setAmount] = useState("");
    const wallet = useWallet();
    const { connection } = useConnection();

    const handleAirdrop = async () => {
        if (wallet.publicKey && amount > 0) {
            await connection.requestAirdrop(wallet.publicKey, amount * 1e9);
            alert("Airdropped: " + amount * 1e9 + " lamports to: " + wallet.publicKey.toBase58());
            setAmount(""); 
        } else {
            alert("Please enter a valid amount.");
        }
    };

    return (
        <div className="mt-4">
            <input
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                type="number"
                placeholder="Enter Amount"
                className="px-2 py-1 border border-gray-400 rounded-md mr-2 text-black" 
            />
            <button
                onClick={handleAirdrop}
                className="border px-2 py-1 border-gray-400 rounded-md mr-2"
            >
                Airdrop
            </button>
        </div>
    );
}
