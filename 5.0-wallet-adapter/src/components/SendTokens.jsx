import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useRef } from "react";
import { Button, Input } from "./Utils";
export function SendTokens() {
    const wallet = useWallet();
    const {connection} = useConnection();
    const toRef = useRef();
    const amountRef = useRef();
    async function sendTokens() {
        let to = toRef.current.value;
        let amount = amountRef.current.value;
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));
        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }
    return <div>
        <Input ref={toRef}  placeholder="To" />
        <Input ref={amountRef} placeholder="Amount" />
        <Button onclick={sendTokens}>Send</Button>
    </div>
}