import { generateMnemonic } from "bip39";

export const handleDelete = (p, currency, setState) => {
  let key;
  if (currency === "ETH") {
    key = "EthWalletAddresses";
  } else {
    key = "solPubKeys";
  }
  const x = localStorage.getItem(key);
  const y = x.split(",");
  console.log(y);
  const z = y.filter((i) => i !== p);
  setState([...z]);
  console.log(z);
  localStorage.setItem(key, [...z]);
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
