import { ethers } from 'ethers';

import constants from '../utils/constants';

import aggregatorV3InterfaceABI from '../utils/chainLinkAbi';

async function getEthPrice(provider) {
  // We create an instance of the contract which we can interact with
  const priceFeed = new ethers.Contract(
    constants.CHAINLINK_ORACLE_ADDRESS,
    aggregatorV3InterfaceABI,
    provider
  );
  // We get the data from the last round of the contract
  let roundData = await priceFeed.latestRoundData();
  // Determine how many decimals the price feed has (10**decimals)
  let decimals = await priceFeed.decimals();
  // We convert the price to a number and return it
  // return Number(roundData.answer * 100n / 10n ** decimals) / 100;
  return { value: roundData.answer, decimals };
}

export default getEthPrice;
