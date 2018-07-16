const CryptoJS = require("crypto-js");

class Block {
    constructor(index, hash, previousHash, timestamp, data){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }
}


const genesisBlock = new Block(
    0,
    "9816129BB579110F6B2230E5DA496A5F4F51049C31FCB96CE755D3565D610364",
    null,
    1531744835778,
    "This is the genesis!!"
)

let blockChain = [genesisBlock];

const getLastBlock = () => blockChain[blockChain.length -1];

const getTimeStamp = () => new Date().getTime() / 1000;

const createHash = (index, previousHash, timestamp, data) => {
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

}

const createNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimestamp = getTimeStamp();
    const newHash = createHash(newBlockIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(
    newBlockIndex,
    newHash,
    previousBlock,
    newTimestamp,
    data
    );
    return newBlock;
};
