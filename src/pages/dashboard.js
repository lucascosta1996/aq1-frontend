import styles from '@/styles/Dashboard.module.scss';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import sampleData from '../sample_data';
import { numberToDollarFormat } from '@/helpers/textFormatting';
import { Aq1IconWhite } from '@/assets/Aq1IconWhite';
import { EtherIcon } from '@/assets/EtherIcon';

export async function getServerSideProps() {
    // TODO: Make api calls here
    return {
        props: {
          dashboardData: sampleData //TODO: replace by api response
        }
      }
}

export default function Dashboard({ dashboardData }) {
    const {
        tokenCount,
        ethPriceInUSD,
        treasuryStake,
        walletAddress,
        treasuryAssetValue,
        ownerCount,
        totalVolume
    } = dashboardData;
    return (
        <>
            <div className={styles.header}>
                <DashboardHeader />
            </div>
            <section className={styles.dashboardContainer}>
                <div className={styles.dashboardCard}>
                    <h2>My Balance</h2>
                    <span className={styles.dashboardCardNumber}>{numberToDollarFormat(tokenCount * ethPriceInUSD)}</span>
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
                    <span className={styles.dashboardCardNumber}>{treasuryStake}%</span>
                    <span className={styles.aq1Quantity}>{tokenCount} AQ1</span>
                    <span className={styles.walletAddress}>{walletAddress}</span>
                </div>
            </section>
        </>
    )
}