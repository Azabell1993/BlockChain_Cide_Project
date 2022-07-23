import * as crypto from 'crypto';
//import * as digest from 'crypto';
let nonce = 0;

//const { subtle } = crypto.webcrypto;
// import * as subtle from 'crypto'; 


async function generateHash(input:string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    
    return hashHex;
}

async function caculateHashWithNonce(nonce: number) : Promise<string> {
    const data = 'Hello World' + nonce;
    return generateHash(data);
}

async function mine(): Promise<void> {
    let data: string;
    do {
        data = await caculateHashWithNonce(++nonce);
    } while (data.startsWith('0000')=== false);
    console.log(`Hash: ${data}, nonce: ${nonce}`);
}

mine();