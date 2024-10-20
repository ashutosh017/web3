const handleDelete = (p,currency,setState)=>{
    let key;
    if(currency==='ETH'){
      key = 'EthWalletAddresses'
    }else{
      key = 'solPubKeys';
    }
    const x = localStorage.getItem(key)
    const y = x.split(',')
    console.log(y);
    const z = y.filter((i)=>i!==p);
    setState([...z])
    console.log(z);
    localStorage.setItem(key,[...z])
  }

  export default handleDelete