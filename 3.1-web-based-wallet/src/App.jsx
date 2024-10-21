import { useEffect, useState } from "react";
import { SolanaWallet } from "./components/SolWallet";
import { EthWallet } from "./components/EthWallet";
import Modal from "./components/Modal";
import {
  cancelDelete,
  confirmDelete,
  genMnemonic,
  handleDeleteEverything,
} from "./handlers/handlers";
import { MdCopyAll } from "react-icons/md";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleCopy = () => {
    const mnemonicText = mnemonic.split(" ").join(" ");
    navigator.clipboard
      .writeText(mnemonicText)
      .then(() => {
        setShowPopup(true); // Show popup
        setTimeout(() => {
          setShowPopup(false); // Hide popup after 3 seconds
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy mnemonic:", err);
      });
  };

  useEffect(() => {
    const savedMnemonic = localStorage.getItem("mnemonic");
    if (savedMnemonic) {
      setMnemonic(savedMnemonic);
      setIsDisabled(true);
    }
  }, []);

  return (
    <div className="sm:px-20 md:px-40 lg:px-60 px-4 py-8 bg-purple-950 min-h-screen text-sm sm:text-base ">
      <div className="flex  relative">
        <button
          className={`px-4 py-2 text-sm rounded-md sm:text-base text-white ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          }`}
          onClick={() => genMnemonic(setMnemonic, isDisabled, setIsDisabled)}
          disabled={isDisabled}
        >
          Generate Mnemonic
        </button>
        {isDisabled && (
          <button
            onClick={() => handleDeleteEverything(setIsModalOpen)}
            className={`px-4 py-2 absolute right-0 text-sm sm:text-base rounded-md bg-red-600 hover:bg-red-700 cursor-pointer text-white ml-2
        
          `}
          >
            Delete Everything
          </button>
        )}
      </div>

      {mnemonic && (
        <>
          <div
            className="mt-8 bg-violet-950 p-4 border rounded-md border-gray-500 text-white cursor-pointer"
            onClick={handleCopy}
          >
            <div className="w-full italic text-gray-500 pb-4 flex space-x-2 items-center " >
              <div className="">Click anywhere to copy</div>
              {/* <div className="border relative w-3.5 h-4 border-gray-400 rotate-12">
                <div className="border absolute top-0.5 right-0.5 w-3.5 h-4 bg-violet-950 border-gray-400"></div>
              </div> */}
             <MdCopyAll className="size-6 hover:text-gray-400"/>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
              {mnemonic.split(" ").map((val, ind) => (
                <div
                  key={ind}
                  className="p-2 border border-gray-500 rounded-md text-center break-words"
                >
                  {val}
                </div>
              ))}
            </div>
          </div>

          {/* <SolanaWallet mnemonic={mnemonic} /> */}
          <EthWallet mnemonic={mnemonic} />
        </>
      )}
      {isModalOpen && (
        <Modal
          onConfirm={() =>
            confirmDelete(setMnemonic, setIsDisabled, setIsModalOpen)
          }
          onCancel={() => cancelDelete(setIsModalOpen)}
        />
      )}
      {showPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 ease-in-out">
          Mnemonic copied to clipboard!
        </div>
      )}
    </div>
  );
}

export default App;
