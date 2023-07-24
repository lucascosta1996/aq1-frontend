import { Aq1IconWhite } from '@/assets/Aq1IconWhite';
import Link from 'next/link';
import styles from './DashboardHeader.module.scss';
import {useRouter} from 'next/router';
import { Tooltip } from 'react-tooltip';

export default function DashboardHeader() {
    const route = useRouter();

    return (
        <header className={styles.header}>
            <div className={styles.aq1Icon}>
                <a href="https://aliquo.xyz">
                    <Aq1IconWhite />
                </a>
            </div>
            <ul className={styles.links}>
                <li className={route?.pathname?.includes('aq1') ? styles.active : null}>
                    {/* <Tooltip id="aliquo-treasury-tooltip" /> */}
                    <a href="https://etherscan.io/address/0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3" target="__blank" data-tooltip-content="0x18c1ea679Aad89e495cA0Fae3a7092c239D755d3" data-tooltip-id="aliquo-treasury-tooltip">
                        0x18c1...55d3
                    </a>
                </li>
            </ul>
        </header>
    )
}
