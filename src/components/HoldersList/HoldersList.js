import { Aq1IconWhite } from '@/assets/Aq1IconWhite';
import { BlurPoolIcon } from '@/assets/BlurPoolIcon';
import { EtherscanIcon } from '@/assets/Etherscan';
import { OpenSeaIcon } from '@/assets/OpenSeaIcon';
import Link from 'next/link';
import styles from './HoldersList.module.scss';
import { topHolders } from '@/helpers/topHolders'

export default function HoldersList() {
    return (
        <div className={styles.container}>
            <header>
                <ul>
                    <li>
                        AQ1 Leaderboard
                    </li>
                    <li>
                        Address
                    </li>
                    <li>
                        AQ1 Owned
                    </li>
                    <li>
                        % AQ1 Owned
                    </li>
                </ul>
            </header>
            <section>
                {
                    topHolders.map((holder, index) => (
                        <ul>
                            <li>
                                <div>
                                    {index}
                                </div>
                                {holder.name}
                            </li>
                            <li>
                                {holder.address}
                            </li>
                            <li>
                                {holder.tokensOwned}
                            </li>
                            <li>
                                {holder.percentageOfTotalSupply}
                            </li>
                        </ul>
                    ))
                }
            </section>
        </div>
    )
}
