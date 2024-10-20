import { useState } from "react";
import handleDelete from "../handlers/handleDelete";

export default function Card({ p, getBalance, currency, setState}) {
  const [balance, setBalance] = useState(null);


  return (
    <>
      <div className="border border-gray-400 rounded-md p-4  ">
        <div className="break-all">{p} </div>
        <div className="flex space-x-4  mt-4 items-center  relative">
          <button
            onClick={() => getBalance(p, setBalance)}
            className="bg-blue-600 px-2 py-1 cursor-pointer text-white rounded-md  "
          >
            Get Balance
          </button>
          {balance && (
            <div className="bg-white text-black px-2 py-1 rounded-md font-medium">
              {balance} {currency}
            </div>
          )}
          <button onClick={()=>handleDelete(p,currency, setState)} className="bg-red-600 px-2 py-1  cursor-pointer text-white rounded-md absolute right-0 ">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
