import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import React, { useRef } from "react";
import { Button, Input } from "./Utils";

export function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const messageRef = useRef(null);

  async function onClick() {
    if (!publicKey) throw new Error("Wallet not connected!");
    if (!signMessage)
      throw new Error("Wallet does not support message signing!");

    const message = messageRef.current?.value;
    if (!message) throw new Error("Message is empty!");

    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
      throw new Error("Message signature invalid!");
    alert("Success", `Message signature: ${bs58.encode(signature)}`);
  }

  return (
    <div>
      <Input ref={messageRef} placeholder="Message" />
      <Button onclick={onClick}>Sign Message</Button>
    </div>
  );
}
