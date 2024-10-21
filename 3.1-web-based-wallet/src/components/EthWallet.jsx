import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet, ethers } from "ethers";
import Card from "./Card";
const api_key = import.meta.env.VITE_ETHERSCAN_API_KEY
export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keyPairs, setKeyPairs] = useState([])
  useEffect(()=>{
    const x = localStorage.getItem('ethKeyPairs');
    if(!x)return;
    const y = JSON.parse(x);
    setKeyPairs([...y]);
  },[])
  const getBalance = async (address,setBalance) => {
    const apiKey = api_key
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const balanceInWei = data.result;
    const balanceInEther = ethers.formatEther(balanceInWei);
    setBalance(balanceInEther)
  };
  
  const addEthWallet = async function () {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    console.log("wallet in etharium: ",wallet)
    setCurrentIndex(currentIndex + 1);
    setKeyPairs((prevKeyPairs)=>{
      const updatedKeyPairs = [...prevKeyPairs, {publicKey:wallet.address,privateKey:wallet.privateKey}]
      localStorage.setItem('ethKeyPairs',JSON.stringify(updatedKeyPairs))
      return updatedKeyPairs;
    });
  }
  return (
    <div>
      <button
        onClick={addEthWallet}
        className="bg-blue-600 hover:bg-blue-700 px-2 py-1 cursor-pointer text-white rounded-md mt-8"
      >
        Add ETH wallet
      </button>

      {keyPairs.length > 0 &&  (
        <div className="flex flex-col  space-y-2 mt-8 bg-violet-950 p-2 border rounded-md border-gray-500  text-white">
          {keyPairs.map((kp, ind) => (
            <div key={ind}>
              <Card keyPair={{publicKey:kp.publicKey,privateKey:kp.privateKey}} getBalance={getBalance} currency={'ETH'} setState={setKeyPairs}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
