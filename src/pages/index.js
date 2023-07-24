import styles from '@/styles/Home.module.scss';
import 'react-tooltip/dist/react-tooltip.css';
import Link from 'next/link';
import { Aq1IconWhite } from '@/assets/Aq1IconWhite';
import ReactDOMServer from 'react-dom/server';
import { Tooltip } from 'react-tooltip'
import { useState } from 'react';
import { TwitterIcon } from '@/assets/TwitterIcon';
import { Arrow } from '@/assets/Arrow';

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

export default function Home() {
    const [showMenu, setShowMenu] = useState(false);
    const [showDashboardIcons, setShowDashboardIcons] = useState(false);
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.aq1Icon}>
                    <Link href="/#main">
                        <Aq1IconWhite />
                    </Link>
                </div>
                <Link href='/dashboard/aq1' className={styles.dashboardButton}>
                    AQ1
                </Link>
            </header>
            {showDashboardIcons ? (
                <ul className={styles.dashboardIcons}>
                    <li>
                        <Link href='/dashboard/aq1'>
                            AQ1
                        </Link>
                        <Link href='/dashboard/aq1'>
                            <div className={styles.arrow}>
                                <Arrow />
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href='/dashboard/asset'>
                            Asset
                        </Link>
                        <Link href='/dashboard/asset'>
                            <div className={styles.arrow}>
                                <Arrow />
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href='/dashboard/treasury'>
                            Treasury
                        </Link>
                        <Link href='/dashboard/treasury'>
                            <div className={styles.arrow}>
                                <Arrow />
                            </div>
                        </Link>

                    </li>
                </ul>
            ) : (
                <h1 className={styles.mainText}>
                    The Decentralized Reserve Asset Protocol
                </h1>
            )}
            <footer className={styles.footer}>
                <div className={styles.aboutMenu}>
                    <ul>
                        <li className={!showMenu && styles.hidden}>
                            <Link href="/Aliquo-Whitepaper.pdf" target="_blank">
                                <a target="__blank" rel="noopener noreferrer">Whitepaper</a>
                            </Link>
                        </li>
                        <li className={!showMenu && styles.hidden}>
                            <a href="https://docs.aliquo.xyz/" target="_blank">
                                Docs
                            </a>
                        </li>
                        <li className={!showMenu && styles.hidden}>
                            <a href="https://mirror.xyz/aliquo.eth" target="_blank">
                                Blog
                            </a>
                        </li>
                        <li className={!showMenu && styles.hidden}>
                            <span>Governance</span>
                        </li>
                        <li className={showMenu && styles.applyOpacity} onClick={() => setShowMenu(!showMenu)}>
                            <span>About</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.iconsSection}>
                    <a href="https://twitter.com/aliquoxyz" target="__blank">
                        <TwitterIcon />
                    </a>
                </div>
            </footer>
        </div>
    )
}
