import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import Card from "./Card";


export const EthWallet = ({ mnemonic }) => {
  useEffect(()=>{
    const x = localStorage.getItem('EthWalletAddresses');
    console.log("Eth wallet addresses: ",x);
    const y = x.split(',')
    setAddresses([...y])
  },[])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const getBalance = async (address) => {
    const balance = await provider.getBalance(address);
    console.log(balance)
  };
  
  const addEthWallet = async function () {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    localStorage.setItem('EthWalletAddresses',[...addresses,wallet.address])
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  }
  return (
    <div>
      <button
        onClick={addEthWallet}
        className="bg-blue-600 px-2 py-1 cursor-pointer text-white rounded-md mt-8"
      >
        Add ETH wallet
      </button>

      {addresses.length > 0 && (
        <div className="flex flex-col  space-y-2 mt-8 bg-violet-950 p-2 border rounded-md border-gray-500  text-white">
          {addresses.map((p, ind) => (
            <div key={ind}>
              <Card p={`Eth - ${p}`} getBalance={()=>getBalance(p)} currency={'ETH'} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
