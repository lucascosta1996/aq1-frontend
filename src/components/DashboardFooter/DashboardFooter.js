import { AliquoLogoLabel } from "@/assets/AliquoLogoLabel";
import { BlurPoolIcon } from "@/assets/BlurPoolIcon";
import { OpenSeaIcon } from "@/assets/OpenSeaIcon";
import { OkxLogo } from "@/assets/OkxLogo";
import Link from "next/link";
import styles from './DashboardFooter.module.scss'
import { UniSwapLogo } from "@/assets/UniSwapLogo";
import { CoinBaseLogo } from "@/assets/CoinBaseLogo";
import { Tooltip } from "react-tooltip";

export default function DashboardFooter({ showIcons = true }) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLinks}>
                <section className={styles.addressContainer}>
                    {/* <Tooltip id="aliquo-treasury-tooltip" className={styles.toolTipBallonAddress} /> */}
                    <a href="https://etherscan.io/address/0xC163A42088c7c65a23B059537519F6a02bD18075#code" target="__blank" data-tooltip-id="aliquo-treasury-tooltip" data-tooltip-content="0xC163A42088c7c65a23B059537519F6a02bD18075" className={styles.tooltipAddress}>
                        Contract
                    </a>
                </section>
                <section className={styles.links}>
                    {showIcons ? (
                        <ul className={styles.icons}>
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
                            {/* <li>
                                <a className={styles.okxIcon} href="https://blur.io/collection/aqone" target="__blank">
                                    <OkxLogo />
                                </a>
                            </li>
                            <li>
                                <a className={styles.okxIcon} href="https://blur.io/collection/aqone" target="__blank">
                                    <UniSwapLogo />
                                </a>
                            </li>
                            <li>
                                <a className={styles.okxIcon} href="https://blur.io/collection/aqone" target="__blank">
                                    <CoinBaseLogo />
                                </a>
                            </li> */}
                        </ul>
                    ) : null}
                    {/* <ul>
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
                    </ul> */}
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
