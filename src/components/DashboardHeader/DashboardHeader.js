import { Aq1IconWhite } from '@/assets/Aq1IconWhite';
import { BlurPoolIcon } from '@/assets/BlurPoolIcon';
import { EtherscanIcon } from '@/assets/Etherscan';
import { OpenSeaIcon } from '@/assets/OpenSeaIcon';
import Link from 'next/link';
import styles from './DashboardHeader.module.scss';

export default function DashboardHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.aq1Icon}>
                <Link href="/#main">
                    <Aq1IconWhite />
                </Link>
                <span className={styles.betaLabel}>BETA</span>
            </div>
            {/* TODO: Make api request to connect wallet */}
            <ul className={styles.links}>
                <li>
                    <a className={styles.osIcon} href="https://etherscan.io/address/0xc163a42088c7c65a23b059537519f6a02bd18075" target="__blank">
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
