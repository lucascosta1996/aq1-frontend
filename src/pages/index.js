import styles from '@/styles/Dashboard.module.scss';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import DashboardFooter from '@/components/DashboardFooter/DashboardFooter';
import { useEffect, useState } from 'react';
import BigNumber from "bignumber.js";
import { EtherIcon } from '@/assets/EtherIcon';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { TooltipIcon } from '@/assets/TooltipIcon';
import { tooltips } from '@/utils/tooltips';
import Head from 'next/head';
import { OpenInNewTabIcon } from '@/assets/OpenInNewTabIcon';

export async function getStaticProps() {
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

export default function Home({
  marketFloorPrice,
  owners,
  sales,
  volume,
  marketCap,
  ethBalanceTreasury,
  blurPoolBalanceTreasury,
  wethBalanceTreasury
}) {
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
        <div className={styles.container}>
            <Head>
                <title>Aliquo</title>
                <meta name="google" content="notranslate" />
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="https://aliquo.xyz/" />
                <meta name="twitter:title" content="Aliquo" />
                <meta name="twitter:description" content="A decentralized reserve asset protocol, built on Ethereum." />
                <meta name="twitter:image" content="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F0KTkDWgsWbKjzAKNB4OG%2Fuploads%2FlETM2l0cC8DfOyXfDiIR%2Fimage.png?alt=media&token=6beafb61-0c31-45b7-b1a0-6db24873d0dd" />
                
                <meta property="og:type" content="Aliquo" />
                <meta property="og:url" content="https://aliquo.xyz/" />
                <meta property="og:title" content="Aliquo" />
                <meta property="og:description" content="A decentralized reserve asset protocol, built on Ethereum." />
                <meta property="og:image" content="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F0KTkDWgsWbKjzAKNB4OG%2Fuploads%2FlETM2l0cC8DfOyXfDiIR%2Fimage.png?alt=media&token=6beafb61-0c31-45b7-b1a0-6db24873d0dd" />

                <meta name="description" content="A decentralized reserve asset protocol, built on Ethereum." />
                <meta name="google-site-verification" content="+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34=" />
                <meta name="robots" content="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F0KTkDWgsWbKjzAKNB4OG%2Fuploads%2FlETM2l0cC8DfOyXfDiIR%2Fimage.png?alt=media&token=6beafb61-0c31-45b7-b1a0-6db24873d0dd" />
            </Head>
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
                        AQ1 Vault Assets Value
                        <Tooltip id="treasury-asset-value-tooltip" className={styles.toolTipBallon} />
                        <a data-tooltip-id="treasury-asset-value-tooltip" data-tooltip-content={tooltips.treasuryAssetValue} className={styles.tooltip}>
                            <TooltipIcon />
                        </a>
                    </h2>
                    <span className={styles.dashboardCardNumber}><EtherIcon />{`${treasuryAssetsValue?.toFixed(5)}`}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>AQ1 Vault Composition</h2>
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
                    <h2>AQ1 Vault Allocation</h2>
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
                <div className={styles.address}>
                    <section className={styles.addressLabel}>
                        AQ1 Vault
                    </section>
                    <section className={styles.addressContainer}>
                        <Tooltip id="aliquo-treasury-tooltip" className={styles.toolTipBallonAddress} />
                        <a href="https://etherscan.io/address/0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3" target="__blank" data-tooltip-id="aliquo-treasury-tooltip" data-tooltip-content="0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3" className={styles.tooltipAddress}>
                            0x18c1...55d3 <OpenInNewTabIcon />
                        </a>
                    </section>
                </div>
                <div className={styles.address}>
                    <section className={styles.addressLabel}>
                        Royalty Recipient
                    </section>
                    <section className={styles.addressContainer}>
                        <Tooltip id="aliquo-treasury-tooltip" className={styles.toolTipBallonAddress} />
                        <a href="https://etherscan.io/address/0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3" target="__blank" data-tooltip-id="aliquo-treasury-tooltip" data-tooltip-content="0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3" className={styles.tooltipAddress}>
                            0x18c1...55d3 <OpenInNewTabIcon />
                        </a>
                    </section>
                </div>
                <div className={styles.address}>
                    <section className={styles.addressLabel}>
                        AQ1 Contract
                    </section>
                    <section className={styles.addressContainer}>
                        <Tooltip id="aliquo-treasury-tooltip" className={styles.toolTipBallonAddress} />
                        <a href="https://etherscan.io/address/0xc163a42088c7c65a23b059537519f6a02bd18075" target="__blank" data-tooltip-id="aliquo-treasury-tooltip" data-tooltip-content="0xc163a42088c7c65a23b059537519f6a02bd18075" className={styles.tooltipAddress}>
                            0x163a...8075 <OpenInNewTabIcon />
                        </a>
                    </section>
                </div>
            </section>
            <DashboardFooter />
        </div>
    )
}
