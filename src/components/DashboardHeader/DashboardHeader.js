import { Aq1IconWhite } from '@/assets/Aq1IconWhite';
import { BlurPoolIcon } from '@/assets/BlurPoolIcon';
import { EtherscanIcon } from '@/assets/Etherscan';
import { OpenSeaIcon } from '@/assets/OpenSeaIcon';
import Link from 'next/link';
import styles from './DashboardHeader.module.scss';

export default function DashboardHeader() {
    return (
        <header className={styles.header}>
            <Link href="/#main" className={styles.aq1Icon}>
                <Aq1IconWhite />
                <span className={styles.betaLabel}>BETA</span>
            </Link>
            {/* TODO: Make api request to connect wallet */}
            <ul className={styles.links}>
                <li>
                    <a className={styles.osIcon} href="https://opensea.io/collection/aqone" target="__blank">
                        <EtherscanIcon />
                    </a>
                </li>
                <li>
                    <a className={styles.osIcon} href="https://opensea.io/collection/aqone" target="__blank">
                        <OpenSeaIcon />
                    </a>
                </li>
                <li>
                    <a className={styles.blurPoolIcon} href="https://blur.io/collection/aqone" target="__blank">
                        <BlurPoolIcon />
                    </a>
                </li>
            </ul>
        </header>
    )
}
