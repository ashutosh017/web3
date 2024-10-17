import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({mnemonic}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);

    return (
        <div>
            <button onClick={async function() {
                const seed = await mnemonicToSeed(mnemonic);
                const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
                 const hdNode = HDNodeWallet.fromSeed(seed);
                 const child = hdNode.derivePath(derivationPath);
                 const privateKey = child.privateKey;
                 const wallet = new Wallet(privateKey);
                 setCurrentIndex(currentIndex + 1);
                setAddresses([...addresses, wallet.address]);
            }}
        className="bg-blue-600 px-2 py-1 cursor-pointer text-white rounded-md mt-8"

            >
                Add ETH wallet
            </button>

           {addresses.length>0 &&
           <div className="flex flex-col  space-y-2 mt-8 bg-violet-950 p-2 border rounded-md border-gray-500  text-white">
             {addresses.map((p, ind )=> <div key={ind}>
                Eth - {p}
            </div>)}
           </div>
           }
        </div>
    )
}