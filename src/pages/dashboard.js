import styles from '@/styles/Dashboard.module.scss';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import sampleData from '../sample_data';
import { numberToDollarFormat } from '@/helpers/textFormatting';
import { EtherIcon } from '@/assets/EtherIcon';
import DashboardFooter from '@/components/DashboardFooter/DashboardFooter';
import { useEffect, useState } from 'react';

export async function getServerSideProps() {
    // TODO: Make api calls here
    return {
        props: {
          dashboardData: sampleData //TODO: replace by api response
        }
      }
}

const temporarySamplePreviousData = {
    tokenCount:2,
    treasuryStake:0.2,
    ethPriceInUSD:1599,
    treasuryBalance:"11.493057399000000004",
    treasuryAssetValue:"18411.877953198000006408",
    ownerCount:309,
    totalVolume:"332.9115",
    lowestPriceIn24H:"0.09",
    tradedVolumeIn24H:"1.3206000000000002",
    walletAddress: "0x8384...",
    treasuryBalanceInWeth: "0.76487951",
    treasuryBalanceInBloorPool: "1.86755",
    treasuryAssetValueInUSD: "23890.506799814640006555",
    treasuryAssetValueTotal: "14.576625909000000004"
}

export default function Dashboard({ dashboardData }) {
    const {
        tokenCount,
        ethPriceInUSD,
        treasuryStake,
        walletAddress,
        treasuryAssetValue,
        ownerCount,
        totalVolume,
        treasuryBalanceInWeth,
        treasuryBalanceInBloorPool,
        treasuryAssetValueTotal
    } = dashboardData;
    
    const [ previousData, setPreviousData ] = useState({});
    const myBalanceDiff = numberToDollarFormat((tokenCount * previousData?.ethPriceInUSD) - (tokenCount * ethPriceInUSD));

    useEffect(() => {
        // TODO: When receiving new api calls we must compare the new values and show the diff for each new value.
        setPreviousData(temporarySamplePreviousData); 
    }, []);
    return (
        <>
            <div className={styles.header}>
                <DashboardHeader />
            </div>
            <section className={styles.dashboardContainer}>
                <div className={styles.dashboardCard}>
                    <h2>My Balance</h2>
                    <span className={styles.dashboardCardNumber}>
                        {numberToDollarFormat(tokenCount * ethPriceInUSD)}
                        {(ethPriceInUSD !== previousData.ethPriceInUSD) ? (
                            <div>
                                <span className={previousData.ethPriceInUSD > ethPriceInUSD ? styles.positiveAmount : styles.negativeAmount}>
                                    {myBalanceDiff}
                                </span>
                            </div>
                        ) : null}
                    </span>
                    <span className={styles.aq1Quantity}>{tokenCount} AQ1</span>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>My Treasury Stake</h2>
                    <span className={styles.dashboardCardNumber}>{treasuryStake}%</span>
                    <span className={styles.aq1Quantity}>{tokenCount} AQ1</span>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>My Voting Weight</h2>
                    <span className={styles.dashboardCardNumber}>{treasuryStake}%</span>
                    <span className={styles.aq1Quantity}>{tokenCount} AQ1</span>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>Treasury Assets Value</h2>
                    <span className={styles.dashboardCardNumber}>{`${numberToDollarFormat(treasuryAssetValue)}`}</span>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>Treasury Composition</h2>
                    <ul className={styles.list}>
                        <li>
                            <span>WETH</span>
                            <p>{parseFloat(treasuryBalanceInWeth)}</p>
                        </li>
                        <li>
                            <span>Blur Pool</span>
                            <p>{parseFloat(treasuryBalanceInBloorPool)}</p>
                        </li>
                        <li>
                            <span>ETH</span>
                            <p>{parseFloat(treasuryAssetValueTotal)}</p>
                        </li>
                    </ul>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>Treasury Allocation</h2>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Backed Floor Price</h2>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Market Floor Price</h2>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Premium</h2>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Sales</h2>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCardSmall}>
                    <h2>AQ1 Owners</h2>
                    <span className={styles.dashboardCardNumber}>{ownerCount}</span>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>AQ1 Market Cap</h2>
                    <span className={styles.dashboardCardNumber}></span>
                    <span className={styles.aq1Quantity}>{tokenCount} AQ1</span>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>AQ1 Volume</h2>
                    <span className={styles.dashboardCardNumber}>{`${numberToDollarFormat(totalVolume * ethPriceInUSD)}`}</span>
                    <span className={styles.aq1Quantity}> = <EtherIcon /> {parseInt(totalVolume)}</span>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
                <div className={styles.dashboardCard}>
                    <h2>AQ1 Royalties Fees</h2>
                    <span className={styles.dashboardCardNumber}>10%</span>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
            </section>
            <DashboardFooter />
        </>
    )
}