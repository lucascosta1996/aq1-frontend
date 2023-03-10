import styles from '@/styles/Dashboard.module.scss';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import sampleData from '../sample_data';
import DashboardFooter from '@/components/DashboardFooter/DashboardFooter';
import { useEffect, useState, useRef } from 'react';
import useIsFirstRender from '@/hooks/useIsFirstRender';
import BigNumber from "bignumber.js";
import { EtherIcon } from '@/assets/EtherIcon';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { TooltipIcon } from '@/assets/TooltipIcon';
import { tooltips } from '@/utils/tooltips';
import { OpenInNewTabIcon } from '@/assets/OpenInNewTabIcon'

export async function getServerSideProps() {
    const [collectionRes, ethBalanceRes, blurPoolBalanceRes, wethBalanceRes] = await Promise.all([
        fetch('https://api.opensea.io/api/v1/collection/aqone?format=json'),
        fetch(`https://api.etherscan.io/api?module=account&action=balance&address=0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`),
        fetch(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x0000000000a39bb272e79075ade125fd351887ac&address=0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`),
        fetch(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xC02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&address=0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`)
    ]);
    const [collection, ethBalance, blurPoolBalance, wethBalance] = await Promise.all([
        collectionRes.json(),
        ethBalanceRes.json(),
        blurPoolBalanceRes.json(),
        wethBalanceRes.json()
    ]);

    return {
      props: {
        marketFloorPrice: collection?.collection?.stats?.floor_price,
        owners: collection?.collection?.stats?.num_owners,
        sales: collection?.collection?.stats?.total_sales,
        volume: collection?.collection?.stats?.total_volume,
        marketCap: collection?.collection?.stats?.market_cap,
        ethBalanceTreasury: ethBalance,
        blurPoolBalanceTreasury: blurPoolBalance,
        wethBalanceTreasury: wethBalance
      },
    }
  }

export default function Dashboard({
    marketFloorPrice,
    owners,
    sales,
    volume,
    marketCap,
    ethBalanceTreasury,
    blurPoolBalanceTreasury,
    wethBalanceTreasury
}) {
    const isFirst = useIsFirstRender();
    const isFirstRender = useRef(true);
    const [treasuryBalance, setTreasuryBalance] = useState(0);
    const [ previousData, setPreviousData ] = useState({});
    const [blurPoolBalance, setBlurPoolBalance] = useState(0);
    const [wethBalance, setWethBalance] = useState(0);
    const [treasuryAssetsValue, setTreasuryAssetsValue] = useState(0);
    const [blurPoolAllocation, setBlurPoolAllocation] = useState(0);
    const [wethAllocation, setWethAllocation] = useState(0);
    const [ethAllocation, setEthAllocation] = useState(0);

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
        // TODO: When receiving new api calls we must compare the new values and show the diff for each new value.
        // setPreviousData(temporarySamplePreviousData);
        if (ethBalanceTreasury !== undefined && ethBalanceTreasury !== null) {
            const bigNumber = new BigNumber(ethBalanceTreasury?.result);
            const formattedBalance = bigNumber.dividedBy('1000000000000000000');
            setTreasuryBalance(formattedBalance);
        }
    }, [ethBalanceTreasury]);

    useEffect(() => {
        if (blurPoolBalanceTreasury !== undefined && blurPoolBalanceTreasury !== null) {
            const bigNumber = new BigNumber(blurPoolBalanceTreasury?.result);
            const formattedBalance = bigNumber.dividedBy('1000000000000000000');
            setBlurPoolBalance(formattedBalance);
        }
    }, [blurPoolBalanceTreasury]);

    useEffect(() => {
        if (wethBalanceTreasury !== undefined && wethBalanceTreasury !== null) {
            const bigNumber = new BigNumber(wethBalanceTreasury?.result);
            const formattedBalance = bigNumber.dividedBy('1000000000000000000');
            setWethBalance(formattedBalance);
        }
    }, [wethBalanceTreasury]);

    return (
        <>
            <div className={styles.header}>
                <DashboardHeader />
            </div>
            <section className={styles.dashboardContainer}>
                <div className={styles.dashboardCardSmall}>
                    <h2>
                        AQ1 Backed Floor Price
                        <Tooltip id="my-tooltip" className={styles.toolTipBallon} />
                        <a data-tooltip-id="my-tooltip" data-tooltip-content={tooltips.aq1BackedFloorPrice} className={styles.tooltip}>
                            <TooltipIcon />
                        </a>
                    </h2>
                    <span className={styles.dashboardCardNumber}><EtherIcon />{parseFloat(treasuryAssetsValue * 0.001).toFixed(5)}</span>
                </div>
                <div className={styles.dashboardCardSmall}>
                    <h2>
                        AQ1 Market Floor Price
                        <Tooltip id="market-floor-tooltip" className={styles.toolTipBallon} />
                        <a data-tooltip-id="market-floor-tooltip" data-tooltip-content={tooltips.aq1MarketFloorPrice} className={styles.tooltip}>
                            <TooltipIcon />
                        </a>
                    </h2>
                    <span className={styles.dashboardCardNumber}><EtherIcon />{marketFloorPrice}</span>
                </div>
                <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Supply</h2>
                    <span className={styles.dashboardCardNumber}>1000</span>
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
                    <span className={styles.dashboardCardNumber}><EtherIcon />{marketCap?.toFixed(5)}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>AQ1 Volume</h2>
                    <span className={styles.dashboardCardNumber}><EtherIcon />{volume?.toFixed(5)}</span>
                    {/* <span className={styles.aq1Quantity}> = <EtherIcon /> {parseInt(totalVolume)}</span> */}
                </div>
                <div className={styles.dashboardCard}>
                    <h2>
                        AQ1 Royalties Fees
                        <Tooltip id="treasury-asset-value-tooltip" className={styles.toolTipBallon} />
                        <a data-tooltip-id="treasury-asset-value-tooltip" data-tooltip-content={tooltips.aq1RoyaltiesFees} className={styles.tooltip}>
                            <TooltipIcon />
                        </a>
                    </h2>
                    {/* <span className={styles.dashboardCardNumber}><EtherIcon />{((10/100) * volume).toFixed(5)}</span> */}
                    <span className={styles.dashboardCardNumber}><EtherIcon />{`${treasuryAssetsValue?.toFixed(5)}`}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>
                        Treasury Assets Value
                        <Tooltip id="treasury-asset-value-tooltip" className={styles.toolTipBallon} />
                        <a data-tooltip-id="treasury-asset-value-tooltip" data-tooltip-content={tooltips.treasuryAssetValue} className={styles.tooltip}>
                            <TooltipIcon />
                        </a>
                    </h2>
                    <span className={styles.dashboardCardNumber}><EtherIcon />{`${treasuryAssetsValue?.toFixed(5)}`}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>Treasury Composition</h2>
                    <ul className={styles.list}>
                        <li>
                            <span>{parseFloat(treasuryBalance?.toFixed(5))}</span>
                            <p>ETH</p>
                        </li>
                        <li>
                            <span>{parseFloat(wethBalance?.toFixed(5))}</span>
                            <p>WETH</p>
                        </li>
                        <li>
                            <span>{parseFloat(blurPoolBalance?.toFixed(5))}</span>
                            <p>Blur Pool</p>
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
                            <span>{wethAllocation}%</span>
                            <p>WETH</p>
                        </li>
                        <li>
                            <span>{blurPoolAllocation}%</span>
                            <p>Blur Pool</p>
                        </li>
                    </ul>
                </div>
            </section>
            <DashboardFooter />
        </>
    )
}