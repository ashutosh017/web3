import { useState } from "react";
import { handleDelete } from "../handlers/handlers";
import { MdContentCopy, MdDelete } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // FaEyeSlash for the "hide" icon

export default function Card({ keyPair, getBalance, currency, setState }) {
  const [balance, setBalance] = useState(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false); // State to toggle private key visibility
  const [copySuccess, setCopySuccess] = useState(""); // State to handle copy success message

  const togglePrivateKey = () => {
    setShowPrivateKey(!showPrivateKey); // Toggle visibility
  };

  // Function to handle copying text to the clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000); // Reset message after 2 seconds
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <>
      <div className="border border-gray-400 rounded-md p-4 space-y-4  ">
        <div className="flex justify-between ">
          <div className="flex space-x-2 flex-1">
            <div className="min-w-12 max-w-12 sm:min-w-24 sm:max-w-24 ">
              Public Key:
            </div>
            <div className="break-all ">{`${keyPair?.publicKey}`} </div>
          </div>
          <div className="flex-items-start">
            <button
              onClick={() => handleCopy(keyPair?.publicKey)} // Copy public key
              className="cursor-pointer"
            >
              <MdContentCopy className="size-5 sm:size-6 mx-1 text-gray-500 hover:text-gray-400 cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="flex justify-between  ">
          <div className="flex space-x-2 flex-1">
            <div className=" min-w-12 max-w-12 sm:min-w-24 sm:max-w-24">
              Private Key:
            </div>
            <div className="break-all ">
              {`${showPrivateKey ? keyPair?.privateKey : "••••••••"}`}
            </div>
          </div>
          <div className="flex space-x-2 text-gray-500 items-start">
            <button onClick={togglePrivateKey}>
              {showPrivateKey ? (
                <FaEyeSlash className="size-5 sm:size-6  mx-1 hover:text-gray-400 cursor-pointer" />
              ) : (
                <FaEye className="size-5 sm:size-6  mx-1 hover:text-gray-400 cursor-pointer" />
              )}
            </button>
            <button
              onClick={() => handleCopy(keyPair?.privateKey)} // Copy private key
              className="cursor-pointer"
            >
              <MdContentCopy className="size-5 sm:size-6 mx-1 hover:text-gray-400 cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mt-4 relative">
          <button
            onClick={() => getBalance(keyPair.publicKey, setBalance)} // Use keyPair.publicKey
            className="bg-blue-600 hover:bg-blue-700 px-2 py-1 cursor-pointer text-white rounded-md"
          >
            Get Balance
          </button>

          {balance && (
            <div className="bg-white text-black px-2 py-1 rounded-md font-medium cursor-default select-none">
              {balance} {currency}
            </div>
          )}

          <button
            onClick={() => handleDelete(keyPair.publicKey, currency, setState)}
            className="py-1 cursor-pointer text-white rounded-md absolute right-0"
          >
            <MdDelete className="hover:text-red-700 text-red-600 size-7" />
          </button>
        </div>

        {/* Display copy success message */}
        {copySuccess && (
          <div className="text-green-600 font-medium mt-2">
            {copySuccess}
          </div>
        )}
      </div>
    </>
  );
}
