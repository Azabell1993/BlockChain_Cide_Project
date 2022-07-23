import { Blockchain, Block } from '../lib/js/bc_transations.js';

enum Status {
    Initialization = 'Initializing the blockchain, creatign the genesis block...',
    AddTransaction = 'Add one or more transcactions.',
    ReadyToMine = "Ready to mine a new block.",
    MinelnProgress = "Mining a new Block..."
}

const amountEI = document.getElementById('amount') as HTMLInputElement;
const blocksEl              = document.getElementById('blocks') as HTMLDivElement;
const confirmBtn            = document.getElementById('confirm') as HTMLButtonElement;
const pendingTransactionsEl = document.getElementById('pending-transactions') as HTMLPreElement;
const recipientEl           = document.getElementById('recipient') as HTMLInputElement;
const senderEl              = document.getElementById('sender') as HTMLInputElement;
const statusEl              = document.getElementById('status') as HTMLParagraphElement;
const transferBtn           = document.getElementById('transfer') as HTMLButtonElement;
