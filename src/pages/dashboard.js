import styles from '@/styles/Dashboard.module.css';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import sampleData from '../sample_data';

export async function getServerSideProps() {
    // TODO: Make api calls here
}

export default function Dashboard() {
    return (
        <>
            <div className={styles.header}>
                <DashboardHeader />
            </div>
            <section>
                <div>
                    <h2>My Balance</h2>
                    <span></span>
                </div>
            </section>
        </>
    )
}