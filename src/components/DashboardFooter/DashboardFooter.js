import { DocsIcon } from "@/assets/DocsIcon";
import { MediumIcon } from "@/assets/MediumIcon";
import { TwitterIcon } from "@/assets/TwitterIcon";
import styles from './DashboardFooter.module.scss'

export default function DashboardFooter() {
    return (
        <footer className={styles.footer}>
            <span>© 2023 Aliquo</span>
            <ul>
                <li>
                    <a href="https://twitter.com/aliquoxyz" target="_blank">
                        <TwitterIcon />
                    </a>
                </li>
                <li>
                    <a href="https://aliquo.medium.com/" target="_blank">
                        <MediumIcon />
                    </a>
                </li>
                <li>
                    <a href="https://docs.aliquo.xyz/" target="_blank">
                        <DocsIcon />
                    </a>
                </li>
            </ul>
        </footer>
    )
}
