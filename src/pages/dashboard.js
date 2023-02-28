import styles from '@/styles/Dashboard.module.scss';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import sampleData from '../sample_data';
import { numberToDollarFormat } from '@/helpers/textFormatting';

export async function getServerSideProps() {
    // TODO: Make api calls here
    return {
        props: {
          dashboardData: sampleData //TODO: replace by api response
        }
      }
}

export default function Dashboard({ dashboardData }) {
    const { tokenCount, ethPriceInUSD, treasuryStake, walletAddress, treasuryAssetValue } = dashboardData;
    return (
        <>
            <div className={styles.header}>
                <DashboardHeader />
            </div>
            <section className={styles.dashboardContainer}>
                <div className={styles.dashboardCard}>
                    <h2>My Balance</h2>
                    <span className={styles.dashboardCardNumber}>{`${numberToDollarFormat(tokenCount * ethPriceInUSD)}`}</span>
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
            </section>
        </>
    )
}