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
// import AnimatedRadialChart from '@/components/AnimatedRadialChart/AnimatedRadialChart';
import dynamic from 'next/dynamic';
const LineChart = dynamic(() => import('@/components/LineChart/LineChart'), { ssr: false });
const BarsChart = dynamic(() => import('@/components/BarsChart/BarsChart'), { ssr: false });
import { historicFloorPrice } from '@/helpers/historicFloorPrice';
import { volumeAndSales } from '@/helpers/volumeAndSales';
import { formatTimestampToDateString, formatTimestampDateNowToDateString } from '@/helpers/textFormatting';

export async function getServerSideProps() {
  
    const [ethBalanceRes, blurPoolBalanceRes, wethBalanceRes] = await Promise.all([
        fetch(`https://api.etherscan.io/api?module=account&action=balance&address=0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`),
        fetch(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x0000000000a39bb272e79075ade125fd351887ac&address=0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`),
        fetch(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xC02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&address=0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`),
    ]);
    const [ethBalance, blurPoolBalance, wethBalance] = await Promise.all([
        ethBalanceRes.json(),
        blurPoolBalanceRes.json(),
        wethBalanceRes.json()
    ]);

  return {
    props: {
      ethBalanceTreasury: ethBalance,
      blurPoolBalanceTreasury: blurPoolBalance,
      wethBalanceTreasury: wethBalance,
    },
  }
}

export const metadata = {
    title: 'Aliquo',
    description: 'A decentralized reserve asset protocol, built on Ethereum.',
    openGraph: {
        title: 'Aliquo',
        description: 'A decentralized reserve asset protocol, built on Ethereum.',
        url: 'https://aliquo.xyz/',
        siteName: 'Aliquo',
        images: [
            {
                url: 'https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F0KTkDWgsWbKjzAKNB4OG%2Fuploads%2FlETM2l0cC8DfOyXfDiIR%2Fimage.png?alt=media&token=6beafb61-0c31-45b7-b1a0-6db24873d0dd',
                width: 800,
                height: 600,
            },
            {
                url: 'https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F0KTkDWgsWbKjzAKNB4OG%2Fuploads%2FlETM2l0cC8DfOyXfDiIR%2Fimage.png?alt=media&token=6beafb61-0c31-45b7-b1a0-6db24873d0dd',
                width: 1800,
                height: 1600,
                alt: 'Aliquo',
            },
        ],
        type: 'website',
    },
    twitter: {
        title: 'Aliquo',
        description: 'A decentralized reserve asset protocol, built on Ethereum.',
        url: 'https://aliquo.xyz/',
        siteName: 'Aliquo',
        images: [
            {
                url: 'https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F0KTkDWgsWbKjzAKNB4OG%2Fuploads%2FlETM2l0cC8DfOyXfDiIR%2Fimage.png?alt=media&token=6beafb61-0c31-45b7-b1a0-6db24873d0dd',
                width: 800,
                height: 600,
            },
            {
                url: 'https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F0KTkDWgsWbKjzAKNB4OG%2Fuploads%2FlETM2l0cC8DfOyXfDiIR%2Fimage.png?alt=media&token=6beafb61-0c31-45b7-b1a0-6db24873d0dd',
                width: 1800,
                height: 1600,
                alt: 'Aliquo',
            },
        ],
        type: 'website',
    },
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
            content: 'https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F0KTkDWgsWbKjzAKNB4OG%2Fuploads%2FlETM2l0cC8DfOyXfDiIR%2Fimage.png?alt=media&token=6beafb61-0c31-45b7-b1a0-6db24873d0dd',
        },
        content: 'https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F0KTkDWgsWbKjzAKNB4OG%2Fuploads%2FlETM2l0cC8DfOyXfDiIR%2Fimage.png?alt=media&token=6beafb61-0c31-45b7-b1a0-6db24873d0dd'
    },
}

export default function AqOne({
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
    const [volumeStats, setVolumeStats] = useState([]);
    const [volumeAndRoyaltiesStats, setVolumeAndRoyaltiesStats] = useState([]);

    useEffect(() => {
        const treasuryAssetsValueBalance = parseFloat(treasuryBalance) + parseFloat(blurPoolBalance) + parseFloat(wethBalance)
        setTreasuryAssetsValue(
            treasuryAssetsValueBalance
        )
        blurPoolBalance !== NaN && setBlurPoolAllocation(Math.round((100 * parseFloat(blurPoolBalance)) / parseFloat(treasuryAssetsValue)))
        wethBalance !== NaN && setWethAllocation(Math.round((100 * parseFloat(wethBalance)) / parseFloat(treasuryAssetsValue)))
        treasuryBalance !== NaN && setEthAllocation(Math.round((100 * parseFloat(treasuryBalance)) / parseFloat(treasuryAssetsValue)))

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

    // useEffect(() => {
    //     let stats = [
    //         {
    //             date: `2002-11-30T08:00:00.000Z`,
    //             close: parseFloat(collection?.stats?.five_minute_volume)
    //         },
    //         {
    //             date: `2014-01-09T08:00:00.000Z`,
    //             close: parseFloat(collection?.stats?.one_day_volume)
    //         },
    //         {
    //             date: `2015-04-09T08:00:00.000Z`,
    //             close: parseFloat(collection?.stats?.seven_day_volume)
    //         },
    //         {
    //             date: `2016-10-10T08:00:00.000Z`,
    //             close: parseFloat(collection?.stats?.thirty_day_volume)
    //         },
    //         {
    //             date: `2022-03-07T08:00:00.000Z`,
    //             close: parseFloat(collection?.stats?.total_volume)
    //         },
    //     ];

    //     for (let i = 0; i < 30; i++) {
    //         const randomObject = {
    //           date: new Date().toISOString(),
    //           close: Math.floor(Math.random() * 100) + 1,
    //         };
    //         stats.unshift(randomObject);
    //     }

    //     const thirtyDayVolume = {
    //         date: formatTimestampDateNowToDateString(Date.now()),
    //         volume: collection?.stats?.thirty_day_volume,
    //         royalties: (collection?.stats?.thirty_day_volume * 10) / 100
    //     };

    //     const volumeAndRoyalties = volumeAndSales?.map(v => {
    //         const date = formatTimestampToDateString(v.timeStamp);
    //         const volume = v.volumeInEth;
    //         const royalties = (v.volumeInEth * 10) / 100;
    //         return (
    //             {
    //                 date,
    //                 royalties,
    //                 volume
    //             }
    //         )
    //     });

    //     volumeAndRoyalties.push(thirtyDayVolume);

    //     setVolumeStats(historicFloorPrice);
    //     setVolumeAndRoyaltiesStats(volumeAndRoyalties);

    // }, [collection])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <DashboardHeader />
            </div>
            <section className={styles.dashboardContainer}>
                <div className={styles.infoCards}>
                    <div className={styles.dashboardCard5050}>
                        <h2>
                            AQ1 Backed Floor Price
                            {/* <Tooltip id="my-tooltip" className={styles.toolTipBallon} />
                            <a data-tooltip-id="my-tooltip" data-tooltip-content={tooltips.aq1BackedFloorPrice} className={styles.tooltip}>
                                <TooltipIcon />
                            </a> */}
                        </h2>
                        <span className={styles.dashboardCardNumber}>{parseFloat(treasuryAssetsValue * 0.001).toFixed(5)} ETH</span>
                    </div>
                    <div className={styles.dashboardCard5050}>
                        <h2>
                            AQ1 Royalties Fees
                            {/* <Tooltip id="treasury-asset-value-tooltip" className={styles.toolTipBallon} />
                            <a data-tooltip-id="treasury-asset-value-tooltip" data-tooltip-content={tooltips.aq1RoyaltiesFees} className={styles.tooltip}>
                                <TooltipIcon />
                            </a> */}
                        </h2>
                        {/* <span className={styles.dashboardCardNumber}><EtherIcon />{((10/100) * volume).toFixed(5)}</span> */}
                        <span className={styles.dashboardCardNumber}>{`${treasuryAssetsValue?.toFixed(5)}`} ETH</span>
                    </div>
                </div>
                {/* <div className={styles.dashboardCardSmall}>
                    <h2>
                        AQ1 Market Floor Price
                        <Tooltip id="market-floor-tooltip" className={styles.toolTipBallon} />
                        <a data-tooltip-id="market-floor-tooltip" data-tooltip-content={tooltips.aq1MarketFloorPrice} className={styles.tooltip}>
                            <TooltipIcon />
                        </a>
                    </h2>
                    <span className={styles.dashboardCardNumber}><EtherIcon />{marketFloorPrice}</span>
                </div> */}
                {/* <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Supply</h2>
                    <span className={styles.dashboardCardNumber}>1000</span>
                </div> */}
                {/* <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Sales</h2>
                    <span className={styles.dashboardCardNumber}>{sales}</span>
                </div> */}
                {/* <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Owners</h2>
                    <span className={styles.dashboardCardNumber}>{owners}</span>
                </div> */}
                {/* <div className={styles.dashboardCard}>
                    <h2>AQ1 Market Cap</h2>
                    <span className={styles.dashboardCardNumber}><EtherIcon />{marketCap?.toFixed(5)}</span>
                </div> */}
                {/* <div className={styles.dashboardCard}>
                    <h2>AQ1 Volume</h2>
                    <span className={styles.dashboardCardNumber}><EtherIcon />{volume?.toFixed(5)}</span>
                    {/* <span className={styles.aq1Quantity}> = <EtherIcon /> {parseInt(totalVolume)}</span>
                </div> */}
                {/* <div className={styles.dashboardCard}>
                    <h2>
                        AQ1 Vault Assets Value
                        <Tooltip id="treasury-asset-value-tooltip" className={styles.toolTipBallon} />
                        <a data-tooltip-id="treasury-asset-value-tooltip" data-tooltip-content={tooltips.treasuryAssetValue} className={styles.tooltip}>
                            <TooltipIcon />
                        </a>
                    </h2>
                    <span className={styles.dashboardCardNumber}><EtherIcon />{`${treasuryAssetsValue?.toFixed(5)}`}</span>
                </div> */}
                {/* <div className={styles.dashboardCard}>
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
                </div> */}
                {/* <div className={styles.dashboardCard}>
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
                </div> */}
                {/* <div className={styles.dashboardCard5050}>
                    <h2>AQ1 Backed Floor Price Chart (30D)</h2>
                    <span className={styles.thirtyDays}>
                        <ul>
                            <li>
                                <div className={styles.volume} /> Volume
                            </li>
                            <li>
                                <div className={styles.royalties} /> Royalties
                            </li>
                        </ul>
                    </span>
                    <div className={styles.desktop}>
                        <LineChart width={650} height={400} stats={volumeStats} color="#0052FE"/>
                    </div>
                    <div className={styles.mobile}>
                        <LineChart width={340} height={100} stats={volumeStats} color="#0052FE" />
                    </div>
                </div>
                <div className={styles.dashboardCard5050}>
                    <h2>AQ1 Market Floor Price Chart (30D)</h2>
                    <div className={styles.desktop}>
                        <BarsChart width={650} height={400} data={volumeAndRoyaltiesStats} color="#0052FE" />
                    </div>
                    <div className={styles.mobile}>
                        <BarsChart width={340} height={220} data={volumeAndRoyaltiesStats} color="#0052FE" />
                    </div>
                </div> */}
                {/* <div className={styles.address}>
                    <section className={styles.addressLabel}>
                        AQ1 Vault
                    </section>
                    <section className={styles.addressContainer}>
                        <Tooltip id="aliquo-treasury-tooltip" className={styles.toolTipBallonAddress} />
                        <a href="https://etherscan.io/address/0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3" target="__blank" data-tooltip-id="aliquo-treasury-tooltip" data-tooltip-content="0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3" className={styles.tooltipAddress}>
                            0x18c1...55d3 <OpenInNewTabIcon />
                        </a>
                    </section>
                </div> */}
                {/* <div className={styles.address}>
                    <section className={styles.addressLabel}>
                        Royalty Recipient
                    </section>
                    <section className={styles.addressContainer}>
                        <Tooltip id="aliquo-treasury-tooltip" className={styles.toolTipBallonAddress} />
                        <a href="https://etherscan.io/address/0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3" target="__blank" data-tooltip-id="aliquo-treasury-tooltip" data-tooltip-content="0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3" className={styles.tooltipAddress}>
                            0x18c1...55d3 <OpenInNewTabIcon />
                        </a>
                    </section>
                </div> */}
                {/* <div className={styles.address}>
                    <section className={styles.addressLabel}>
                        AQ1 Contract
                    </section>
                    <section className={styles.addressContainer}>
                        <Tooltip id="aliquo-treasury-tooltip" className={styles.toolTipBallonAddress} />
                        <a href="https://etherscan.io/address/0xc163a42088c7c65a23b059537519f6a02bd18075" target="__blank" data-tooltip-id="aliquo-treasury-tooltip" data-tooltip-content="0xc163a42088c7c65a23b059537519f6a02bd18075" className={styles.tooltipAddress}>
                            0x163a...8075 <OpenInNewTabIcon />
                        </a>
                    </section>
                </div> */}
                <DashboardFooter />
            </section>
        </div>
    )
}
