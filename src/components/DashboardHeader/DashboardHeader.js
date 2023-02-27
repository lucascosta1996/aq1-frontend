import { Aq1IconWhite } from '@/assets/Aq1IconWhite';
import Link from 'next/link';
import styles from './DashboardHeader.module.scss';

export default function DashboardHeader() {
    return (
        <header className={styles.header}>
            <Link href="/#main">
                <Aq1IconWhite />
            </Link>
            {/* TODO: Make api request to connect wallet */}
            <button>Connect Wallet</button>
        </header>
    )
}
