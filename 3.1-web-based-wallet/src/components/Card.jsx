import { useState } from "react";

export default function Card({ p, getBalance, currency}) {
    const [balance, setBalance] = useState(null);
  
  
    return (
      <>
        <div className="border border-gray-400 rounded-md p-4  ">
          <div className="break-all">{p} </div>
          <div className="flex space-x-4  mt-4 items-center">
            <button
              onClick={() => getBalance(p, setBalance)}
              className="bg-blue-600 px-2 py-1 cursor-pointer text-white rounded-md  "
            >
              Get Balance
            </button>
            <div className="bg-white text-black px-2 py-1   rounded-md font-medium">
              {balance} {currency}
            </div>
          </div>
        </div>
      </>
    );
  }