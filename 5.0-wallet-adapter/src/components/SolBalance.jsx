import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function SolBalance(){
    const [balance, setBalance] = useState(null);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {
        async function getBalance() { 
            if (publicKey) {
                const balance = await connection.getBalance(publicKey);
                setBalance(balance / LAMPORTS_PER_SOL);
            }
        }
        getBalance();
    }, [publicKey, connection]);

    return <div className="mt-4 ">
        Sol Balance: <span className="font-bold">{balance !== null ? balance : "Loading..."}</span>
    </div>;
}














































