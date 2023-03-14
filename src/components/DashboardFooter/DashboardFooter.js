import { Aq1IconWhite } from "@/assets/Aq1IconWhite";
import { DocsIcon } from "@/assets/DocsIcon";
import { MediumIcon } from "@/assets/MediumIcon";
import { TwitterIcon } from "@/assets/TwitterIcon";
import Link from "next/link";
import styles from './DashboardFooter.module.scss'

export default function DashboardFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLinks}>
                <section className={styles.logo}>
                    <Aq1IconWhite />
                </section>
                <section className={styles.links}>
                    <ul>
                        <li>
                            <span>Resources</span>
                        </li>
                        <li>
                            <a href="https://docs.aliquo.xyz/" target="_blank">
                                Documentation
                            </a>
                        </li>
                        <li>
                            <Link href="/Aliquo-Whitepaper.pdf" target="_blank">
                                <a target="__blank" rel="noopener noreferrer">Whitepaper</a>
                            </Link>
                        </li>
                        <li>
                            <a href="https://etherscan.io/address/0xc163a42088c7c65a23b059537519f6a02bd18075" target="_blank">
                                AQ1 Contract
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>Protocol</span>
                        </li>
                        <li>
                            <a href="https://mirror.xyz/aliquo.eth" target="_blank">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/aliquoxyz" target="_blank">
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a href="https://gov.aliquo.xyz/#/" target="_blank">
                                Snapshot
                            </a>
                        </li>
                    </ul>
                    <ul>
                    <li>
                            <span>Legal</span>
                        </li>
                        <li>
                            <a href="https://docs.aliquo.xyz/statements/terms-of-use/4.-disclaimer" target="_blank">
                                Disclaimer
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.aliquo.xyz/statements/terms-of-use/9.-privacy-policy" target="_blank">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
            {/* <div className={styles.footerFooter}>
                <span>2023 Aliquo</span>
                <a href="https://twitter.com/aliquoxyz" target="__blank">
                    <TwitterIcon />
                </a>
            </div> */}
        </footer>
    )
}
