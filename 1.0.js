import crypto from 'crypto'
// const input = '100xDevs';
// const hash = crypto.createHash('sha256').update(input).digest('hex')
function hashStartsWith00000(){
    const prefix = '00000';
    let val=0;
    while(true){
        const hash =  crypto.createHash('sha256').update(val.toString()).digest('hex');
        if(hash.startsWith(prefix)){
            return {"input":val.toString(),"hash":hash};
        }
        val++;
    }
}
function inputStartsWtih100xDevs(){
    const prefix = '00000';
    const input = '100xDevs';
    let val=0;
    while(true){
        const hash =  crypto.createHash('sha256').update(input+val.toString()).digest('hex');
        if(hash.startsWith(prefix)){
            return {"input":input+val.toString(),"hash":hash};
        }
        val++;
    }
}
function findANonceForAGivenInput(input){
    let nonce=0;
    while(true){
        const hash = crypto.createHash('sha256').update(input+nonce.toString()).digest('hex');
        if(hash.startsWith('00000')){
            return {
                "input":input,
                "nonce":nonce.toString(),
                "hash":hash
            }
        }
        nonce++;
    }
}
console.log(hashStartsWith00000());
console.log(inputStartsWtih100xDevs());
console.log(findANonceForAGivenInput(`harkirat => Raman | Rs 100 | Ram => Ankit | Rs 10`))

