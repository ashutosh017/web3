import { generateMnemonic } from "bip39";

export const handleDelete = (p, currency, setState) => {
  let key;
  if (currency === "ETH") {
    key = "ethKeyPairs";
  } else {
    key = "solKeyPairs";
  }

  const storedData = localStorage.getItem(key);
  if (!storedData) return;

  let walletArray = JSON.parse(storedData);

  let updatedWalletArray = walletArray.filter((wallet) => wallet.publicKey !== p);

  setState(updatedWalletArray);

  localStorage.setItem(key, JSON.stringify(updatedWalletArray));

  console.log("Updated walletArray: ", updatedWalletArray);
};


export const handleDeleteEverything = (setIsModalOpen) => {
  setIsModalOpen(true);
};
export const confirmDelete = (setMnemonic,setIsDisabled,setIsModalOpen) => {
  localStorage.clear();
  setMnemonic("");
  setIsDisabled(false);
  setIsModalOpen(false);
};
export const cancelDelete = (setIsModalOpen) => {
  setIsModalOpen(false);
};

export const genMnemonic = async (setMnemonic,isDisabled, setIsDisabled ) => {
  if (!isDisabled) {
    const mn = generateMnemonic();
    setMnemonic(mn);
    localStorage.setItem("mnemonic", mn);
    setIsDisabled(true);
  }
};
