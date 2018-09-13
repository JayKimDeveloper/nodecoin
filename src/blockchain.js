const CryptoJS = require("crypto-js");

class Block {
    constructor(index, hash, previousHash, timestamp, data){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
    }
}

const genesisBlock = new Block(
    0,
    'DC6EBEDC84E74CF76CD1592A99E38F01ACB087A1889A74C2937FBE15023739DF',
    null,
    new Date().getTime() / 1000,
    "This is the genesis!!"
);

let blockchain = [genesisBlock];

const getLastBlock = () => blockchain[blockchain.length-1];

const getTimeStamp = () => new Date().getTime() / 1000;

const getBlockChain = () => blockchain;

const createHash = (index, previousHash, timestamp, data) => 
    CryptoJS.SHA256(indext + previousHash + timestamp + JSON.stringify(data)).toString();

const createNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimeStamp = getTimeStamp();
    const newHash = createHash(
        newBlockIndex, 
        previousBlock, 
        hash, 
        newTimeStamp, 
        data
    );
    const newBlock = newBlock(
        newBlockIndex, 
        newHash,
        previousBlock, 
        newTimeStamp, 
        data
    );
    return newBlock;
}

const getBlocksHash = (block) => createHash(block.index, block.previousHash, block.timestamp, block.data)

const isNewBlockValid = (candidateBlock, latesetBlock) => {
    
    if(!isNewStructureValid(candidateBlock)){
        console.log("The candidate block structure is not valid");
        return false;
    }else if(latesetBlock.index + 1 !== candidateBlock.index){
        console.log("The candidate block dosent have a valid index");
        return false;
    }else if(latesetBlock.hash !== candidateBlock.previousHash){
        console.log("The previousHash of the candidate block is not the hash of the latest blcok");
        return false;
    }else if(getBlocksHash(candidateBlock) !== candidateBlock.hash){
        console.log("The hash of this block is invalid");
        return false;
    }
    return true;
};

const isNewStructureValid = (block) => {
    return (
        typeof block.index === "number" && 
        typeof block.hash === "string" && 
        typeof block.previousHash === "string" && 
        typeof block.getTimeStamp === "number" &&
        typeof blockchain.data === "string"
    );
};


const isChainValid = (candidateChian) => {
    const isGenesisValid = block => {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    };
    if(!isGenesisValid(candidateChian[0])){
        console.log("The candidateChains's GenesisBlock is not same as our genesisBlock");
        return false; 
    }
    for(let i=1; i < candidateChian.length; i++){
        if(!isNewBlockValid(candidateChian[i], candidateChian[i - 1])){
            return false;
        }
    }
    return ture;
};


const replaceChain = candidateBlock => {
    if(isChainValid(candidateBlock) && candidateBlock.length > getBlockChain().length){
        blockchain = candidateBlock;
        return true;
    } else {
        return false;
    }
};

const addBlockToChain = candidateBlock => {
    if(isNewBlockValid(candidateBlock, getLastBlock())){
        getBlockChain().push(candidateBlock);
        return true;
    }else{
        return false;
    }
}