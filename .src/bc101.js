"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
class Block {
    constructor(index, /* 블록 인덱스는 순차적으로 매겨진다. */ previousHash, /* 이전 블록의 해시값 */ timestamp, /* 블록이 생성된 시간 */ data /* 앱 관련 데이터 */) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash(); /* 생성된 블록 해시값을 계산한다. */
    }
    calculateHash() {
        const data = this.index + this.previousHash + this.timestamp + this.data;
        return crypto
            .createHash('sha256') /* SHA-256 hash를 생성하기 위해 Hash의 인스턴스를 생성한다. */
            .update(data) /* 해시 객체 내 해시값을 계산하고 업데이트 한다. */
            .digest('hex'); /* 해시값을 16진수로 변환한다. */
    }
}
;
/*
    블록 거래 내역은 문자열 타입으로 data 객체에 저장이 된다. 실제로  data 프로퍼티는 데이터 구조를 설명하는 커스텀 타입이 있어야한다.
    그러나 블록체인은 문자열 타입을 사용한다.
*/
class Blockchain {
    constructor() {
        this.chain = [];
        //Create the geenesis block.
        this.chain.push(/* 제네시스 블록을 생성하고 체인에 추가한다. */ new Block(0, '0', Date.now(), 'Genesis block'));
    }
    get latesBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(data) {
        /* 새 블록 인스턴스를 생성하고 각 프로퍼티를 추가함. */
        const block = new Block(this.latesBlock.index + 1, this.latesBlock.hash, Date.now(), data);
        // 배열에 블록을 추가
        this.chain.push(block);
    }
}
console.log('CREATING THE BLOCKCHAIN WITH THE GENESIS BLOCK....');
const blockchain = new Blockchain();
console.log('Mining block #1...');
blockchain.addBlock('First block');
console.log('Mining block #2...');
blockchain.addBlock('Second block');
console.log(JSON.stringify(blockchain, null, 2));
// interface Block {
//     index: number;              /* 순차적 블록 번호 */
//     timestamp: number;          /* 새 블록이 블록체인에 추가된 날짜와 시간 */
//     data: string;               /* 한 번 이상의 거래에 대한 데이터 */
//     nonce: number;              /* 채굴자들이 알아내야 할 숫자 */
//     hash: string;               /* 이 블록의 해시 */
//     privousBlockHash: string;   /* 이전 블록의 해시값 */
// }
