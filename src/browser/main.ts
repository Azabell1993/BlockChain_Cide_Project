import { Blockchain, Block } from '../lib/js/bc_transations.js';

enum Status {
    Initialization = 'Initializing the blockchain, creatign the genesis block...',
    AddTransaction = 'Add one or more transcactions.',
    ReadyToMine = "Ready to mine a new block.",
    MinelnProgress = "Mining a new Block..."
}


