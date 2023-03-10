import styles from '@/styles/Dashboard.module.scss';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import sampleData from '../sample_data';
import DashboardFooter from '@/components/DashboardFooter/DashboardFooter';
import { useEffect, useState, useRef } from 'react';
import useIsFirstRender from '@/hooks/useIsFirstRender';
import BigNumber from "bignumber.js";

export default function Dashboard({ dashboardData }) {
    const isFirst = useIsFirstRender();
    const isFirstRender = useRef(true);
    
    const [ previousData, setPreviousData ] = useState({});
    const [treasuryBalance, setTreasuryBalance] = useState(null);
    const [blurPoolBalance, setBlurPoolBalance] = useState(0);
    const [wethBalance, setWethBalance] = useState(0);
    const [treasuryAssetsValue, setTreasuryAssetsValue] = useState(0);
    const [blurPoolAllocation, setBlurPoolAllocation] = useState(0);
    const [wethAllocation, setWethAllocation] = useState(0);
    const [ethAllocation, setEthAllocation] = useState(0);
    const [marketFloorPrice, setMarketFloorPrice] = useState(0);
    const [owners, setOwners] = useState(0);
    const [sales, setSales] = useState(0);
    const [volume, setVolume] = useState(0);
    const [marketCap, setMarketCap] = useState(0);

    useEffect(() => {
        const treasuryAssetsValueBalance = parseFloat(treasuryBalance) + parseFloat(blurPoolBalance) + parseFloat(wethBalance)
        setTreasuryAssetsValue(
            treasuryAssetsValueBalance
        )
        blurPoolBalance !== NaN && setBlurPoolAllocation(Math.round((100 * parseInt(blurPoolBalance)) / parseInt(treasuryAssetsValue)))
        wethBalance !== NaN && setWethAllocation(Math.round((100 * parseInt(wethBalance)) / parseInt(treasuryAssetsValue)))
        treasuryBalance !== NaN && setEthAllocation(Math.round((100 * parseInt(treasuryBalance)) / parseInt(treasuryAssetsValue)))

    }, [treasuryBalance, blurPoolBalance, wethBalance, treasuryAssetsValue]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (isFirst) {
            async function fetchBalance() {
                const response = await fetch(
                    `https://api.etherscan.io/api?module=account&action=balance&address=0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
                );
                let result = await response.json();
                const bigNumber = new BigNumber(result.result);
                const formattedResult = bigNumber.dividedBy('1000000000000000000');
                setTreasuryBalance(formattedResult)
                return result;
            }
    
            async function fetchBlurPoolBalance() {
                const response = await fetch(
                    `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x0000000000a39bb272e79075ade125fd351887ac&address=0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
                  );
                  let result = await response.json();
                  const bigNumber = new BigNumber(result.result);
                  const formattedResult = bigNumber.dividedBy('1000000000000000000');
                  setBlurPoolBalance(formattedResult)
                  return result;
            }
    
            async function fetchWETHBalance() {
                const response = await fetch(
                    `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xC02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&address=0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
                  );
                  let result = await response.json();
                  const bigNumber = new BigNumber(result.result);
                  const formattedResult = bigNumber.dividedBy('1000000000000000000');
                  setWethBalance(formattedResult)
                  return result;
            }

            const getOpenseaStats = async () => {
                const response = await fetch(
                  'https://api.opensea.io/api/v1/collection/aqone?format=json'
                );

                let collection = await response.json();
                console.log(`collection os`, collection.collection.stats.floor_price)
                setMarketFloorPrice(collection?.collection?.stats?.floor_price);
                setOwners(collection?.collection?.stats?.num_owners);
                setSales(collection?.collection?.stats?.total_sales);
                setVolume(collection?.collection?.stats?.total_volume);
                setMarketCap(collection?.collection?.stats?.market_cap);
              
                return (await response).stats;
            };
          
            fetchBalance();
            fetchBlurPoolBalance();
            fetchWETHBalance();
            getOpenseaStats();
        }
    }, []);

    useEffect(() => {
        // TODO: When receiving new api calls we must compare the new values and show the diff for each new value.
        // setPreviousData(temporarySamplePreviousData); 
    }, []);

    return (
        <>
            <div className={styles.header}>
                <DashboardHeader />
            </div>
            <section className={styles.dashboardContainer}>
                <div className={styles.dashboardCard}>
                    <h2>Treasury Assets Value</h2>
                    <span className={styles.dashboardCardNumber}>{`${treasuryAssetsValue?.toFixed(5)}`}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>Treasury Composition</h2>
                    <ul className={styles.list}>
                        <li>
                            <span>WETH</span>
                            <p>{parseFloat(wethBalance?.toFixed(5))}</p>
                        </li>
                        <li>
                            <span>Blur Pool</span>
                            <p>{parseFloat(blurPoolBalance?.toFixed(5))}</p>
                        </li>
                        <li>
                            <span>ETH</span>
                            <p>{parseFloat(treasuryBalance?.toFixed(5))}</p>
                        </li>
                    </ul>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>Treasury Allocation</h2>
                    <ul className={styles.list}>
                        <li>
                            <span>{ethAllocation}%</span>
                            <p>ETH</p>
                        </li>
                        <li>
                            <span>{blurPoolAllocation}%</span>
                            <p>Blur Pool</p>
                        </li>
                        <li>
                            <span>{wethAllocation}%</span>
                            <p>WETH</p>
                        </li>
                    </ul>
                </div>
                <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Backed Floor Price</h2>
                    <span className={styles.dashboardCardNumber}>{parseFloat(treasuryAssetsValue * 0.001).toFixed(5)}</span>
                </div>
                <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Market Floor Price</h2>
                    <span className={styles.dashboardCardNumber}>{marketFloorPrice}</span>
                </div>
                <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Premium</h2>
                    <span className={styles.dashboardCardNumber}>{(parseFloat(marketFloorPrice) - (parseFloat(treasuryAssetsValue) / parseFloat(marketFloorPrice))).toFixed(5)}</span>
                </div>
                <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Sales</h2>
                    <span className={styles.dashboardCardNumber}>{sales}</span>
                </div>
                <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Owners</h2>
                    <span className={styles.dashboardCardNumber}>{owners}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>AQ1 Market Cap</h2>
                    <span className={styles.dashboardCardNumber}>{marketCap.toFixed(5)}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>AQ1 Volume</h2>
                    <span className={styles.dashboardCardNumber}>{volume.toFixed(5)}</span>
                    {/* <span className={styles.aq1Quantity}> = <EtherIcon /> {parseInt(totalVolume)}</span> */}
                </div>
                <div className={styles.dashboardCard}>
                    <h2>AQ1 Royalties Fees</h2>
                    <span className={styles.dashboardCardNumber}>10%</span>
                </div>
            </section>
            <DashboardFooter />
        </>
    )
}