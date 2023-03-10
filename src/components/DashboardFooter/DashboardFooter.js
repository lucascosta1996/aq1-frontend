import { DocsIcon } from "@/assets/DocsIcon";
import { MediumIcon } from "@/assets/MediumIcon";
import { TwitterIcon } from "@/assets/TwitterIcon";
import styles from './DashboardFooter.module.scss'

export default function DashboardFooter() {
    return (
        <footer className={styles.footer}>
            <span>Aliquo Dashboard v0.1</span>
            <ul>
                <li>
                    <a href="https://docs.aliquo.xyz/" target="_blank">
                        <DocsIcon />
                    </a>
                </li>
            </ul>
        </footer>
    )
}
