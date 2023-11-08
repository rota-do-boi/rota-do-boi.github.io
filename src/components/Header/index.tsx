import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

import { FiMenu, FiX } from "react-icons/fi";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className={`container ${styles.header__container}`}>
        <div className={styles.header__content}>
          <div className={styles.header__wrapper}>
            <Link href="/" passHref>
              <a className={styles.header__logo}>
                <Image
                  src="/images/logo_branca.svg"
                  alt="Logo Rota do Boi"
                  width="233.79"
                  height="51.27"
                  priority
                />
              </a>
            </Link>
            <nav className={`${styles.nav} ${menuOpen && styles.active}`}>
              <div className={styles.nav__logo}>
                <Image
                  src="/images/logo_only_black.svg"
                  alt="Logo Rota do boi"
                  width="64"
                  height="68"
                  priority
                />
              </div>
              <Link href="/#products">
                <a className={styles.nav__item} onClick={()=>{setMenuOpen(false)}}>Produtos</a>
              </Link>
              <Link href="/#quemsomos">
                <a className={styles.nav__item} onClick={()=>{setMenuOpen(false)}}>Quem Somos</a>
              </Link>
              <Link href="/#events">
                <a className={styles.nav__item} onClick={()=>{setMenuOpen(false)}}>Espetaria</a>
              </Link>
              <Link href="/#depositions">
                <a className={styles.nav__item} onClick={()=>{setMenuOpen(false)}}>Depoimentos</a>
              </Link>
              <Link href="/#fidelity">
                <a className={styles.nav__item} onClick={()=>{setMenuOpen(false)}}>Fidelidade</a>
              </Link>
              <Link href="/#location">
                <a className={styles.nav__item} onClick={()=>{setMenuOpen(false)}}>Onde estamos</a>
              </Link>
            </nav>
            <div className={`${styles.mobile__menu__icons} ${menuOpen && styles.menu__opened}`}>
              {!menuOpen ? (
                <a
                  className={styles.mobile__button}
                  onClick={() => {
                    setMenuOpen(true);
                  }}
                >
                  <FiMenu
                    size={36}
                    color="#fff"
                    className={styles.button__icon}
                  />
                </a>
              ) : (
                <a
                  className={styles.mobile__button}
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  <FiX
                    size={36}
                    color="#0D0D0D"
                    className={styles.button__icon}
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
