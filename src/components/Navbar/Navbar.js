import React, { useEffect } from 'react';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import { Aq1Icon } from '@/assets/Aq1Icon';
import useScrollPosition from '@/hooks/useScrollPosition';

export default function Navbar({ hideOnFirstView }) {
    const scrollPosition = useScrollPosition();
    useEffect(() => {
        if (hideOnFirstView && scrollPosition > 41) {
            // TODO: make smooth transition
        }
    }, [useScrollPosition])
    return (
        <nav className={styles.navbar}>
            <Aq1Icon />
            <ul>
                <li>
                <Link href="/about">
                    About
                </Link>
                </li>
                <li>
                    <a href="https://docs.aliquo.xyz/" target="_blank">Docs</a>
                </li>
                <li>
                <Link href="/dashboard">
                    Dashboard
                </Link>
                </li>
                <li>
                    <a href="https://mirror.xyz/aliquo.eth" target="_blank">Blog</a>
                </li>            
            </ul>
        </nav>
    )
}