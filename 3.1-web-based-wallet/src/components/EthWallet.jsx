import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet, ethers } from "ethers";
import Card from "./Card";
import handleDelete from "../handlers/handleDelete";
const api_key = import.meta.env.VITE_ETHERSCAN_API_KEY



export const EthWallet = ({ mnemonic }) => {
  useEffect(()=>{
    const x = localStorage.getItem('EthWalletAddresses');
    if(!x)return;
    console.log("Eth wallet addresses: ",x);
    const y = x.split(',')
    setAddresses([...y])
  },[])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const getBalance = async (address,setBalance) => {
    const apiKey = api_key
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const balanceInWei = data.result;
    const balanceInEther = ethers.formatEther(balanceInWei);
    setBalance(balanceInEther)
    console.log(`Balance of ${address}: ${balanceInEther} ETH`);
    return balanceInEther;
  };
  
  const addEthWallet = async function () {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    console.log(wallet)
    setCurrentIndex(currentIndex + 1);
    setAddresses((prevAddresses)=>{
      const updatedAddresses = [...prevAddresses, wallet.address]
      localStorage.setItem('EthWalletAddresses',updatedAddresses)
      return updatedAddresses;
    });
  }
  return (
    <div>
      <button
        onClick={addEthWallet}
        className="bg-blue-600 px-2 py-1 cursor-pointer text-white rounded-md mt-8"
      >
        Add ETH wallet
      </button>

      {addresses.length > 0 &&  (
        <div className="flex flex-col  space-y-2 mt-8 bg-violet-950 p-2 border rounded-md border-gray-500  text-white">
          {addresses.map((p, ind) => (
            <div key={ind}>
              <Card p={p} getBalance={getBalance} currency={'ETH'} setState={setAddresses}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
