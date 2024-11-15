import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  TOKEN_2022_PROGRAM_ID,
  getMintLen,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  TYPE_SIZE,
  LENGTH_SIZE,
  ExtensionType,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import { useRef } from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

export function TokenLaunchpad() {
  const nameRef = useRef();
  const symbolRef = useRef();
  const imageRef = useRef();
  const initalSupplyRef = useRef();
  const { connection } = useConnection();
  const wallet = useWallet();

  const createToken = async () => {
   try {
     const mintKeypair = Keypair.generate();
     console.log("Mint account address: " + mintKeypair.publicKey.toBase58());
 
     const external_metadata = {
       name: nameRef.current.value,
       symbol: symbolRef.current.value,
       image: imageRef.current.value,
       creators: [wallet.publicKey],
     };
 
     const umi = createUmi(connection)
       .use(walletAdapterIdentity(wallet))
       .use(mplTokenMetadata())
       .use(irysUploader());
     const metadataUri = (
       await umi.uploader.uploadJson(external_metadata)
     ).replace("arweave.net", "gateway.irys.xyz");
 
     console.log("metadata uri: ", metadataUri);
 
     const metadata = {
       mint: mintKeypair.publicKey,
       name: nameRef.current.value,
       symbol: symbolRef.current.value,
       uri: metadataUri,
       additionalMetadata: [],
     };
 
     const mintLen = getMintLen([ExtensionType.MetadataPointer]);
     const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
 
     const lamports = await connection.getMinimumBalanceForRentExemption(
       mintLen + metadataLen
     );
 
     const transaction = new Transaction().add(
       SystemProgram.createAccount({
         fromPubkey: wallet.publicKey,
         newAccountPubkey: mintKeypair.publicKey,
         space: mintLen,
         lamports,
         programId: TOKEN_2022_PROGRAM_ID,
       }),
       createInitializeMetadataPointerInstruction(
         mintKeypair.publicKey,
         wallet.publicKey,
         mintKeypair.publicKey,
         TOKEN_2022_PROGRAM_ID
       ),
       createInitializeMintInstruction(
         mintKeypair.publicKey,
         9,
         wallet.publicKey,
         null,
         TOKEN_2022_PROGRAM_ID
       ),
       createInitializeInstruction({
         programId: TOKEN_2022_PROGRAM_ID,
         mint: mintKeypair.publicKey,
         metadata: mintKeypair.publicKey,
         name: metadata.name,
         symbol: metadata.symbol,
         uri: metadata.uri,
         mintAuthority: wallet.publicKey,
         updateAuthority: wallet.publicKey,
       })
     );
     transaction.feePayer = wallet.publicKey;
     transaction.recentBlockhash = (
       await connection.getLatestBlockhash()
     ).blockhash;
     transaction.sign(mintKeypair);
 
     await wallet.sendTransaction(transaction, connection);
 
     const associatedToken = getAssociatedTokenAddressSync(
       mintKeypair.publicKey,
       wallet.publicKey,
       false,
       TOKEN_2022_PROGRAM_ID
     );
     console.log("associated token: ", associatedToken.toBase58());
 
     const transaction2 = new Transaction().add(
       createAssociatedTokenAccountInstruction(
         wallet.publicKey,
         associatedToken,
         wallet.publicKey,
         mintKeypair.publicKey,
         TOKEN_2022_PROGRAM_ID
       ),
       createMintToInstruction(
         mintKeypair.publicKey,
         associatedToken,
         wallet.publicKey,
         initalSupplyRef.current.value * 1000000000,
         [],
         TOKEN_2022_PROGRAM_ID
       )
     );
 
     transaction2.feePayer = wallet.publicKey;
     transaction2.recentBlockhash = (
       await connection.getLatestBlockhash()
     ).blockhash;
 
     await wallet.sendTransaction(transaction2, connection);
 
     console.log("minted!!");
   } catch (error) {
    console.log("Error while creating token!")
   }
  };
  return (
    <div className=" flex text-white justify-center items-center flex-col h-full ">
      <h1 className="text-white text-5xl font-extrabold mb-8 text-center">
        Solana Token Launchpad
      </h1>
      <div className="flex flex-col space-y-4">
        <input
          ref={nameRef}
          className="inputText"
          type="text"
          placeholder="Name"
        />
        <input
          ref={symbolRef}
          className="inputText"
          type="text"
          placeholder="Symbol"
        />
        <input
          ref={imageRef}
          className="inputText"
          type="text"
          placeholder="Image URL"
        />
        <input
          ref={initalSupplyRef}
          className="inputText"
          type="text"
          placeholder="Initial Supply"
        />
        <button
          onClick={createToken}
          className="border bg-zinc-800 p-5 rounded-md w-38 mx-auto"
        >
          Create a token
        </button>
      </div>
    </div>
  );
}
