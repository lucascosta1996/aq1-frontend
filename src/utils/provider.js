
import { ethers } from 'ethers';

const provider = ethers.JsonRpcProvider(
  'https://rpc.coinsdo.com/eth',
  1
);

export default provider;