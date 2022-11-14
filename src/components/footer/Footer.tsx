import React from 'react';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className={styles.wrap}>
        <div className={styles.copyright}>
          ©<span>2022</span>
        </div>
        <div className={styles.team}>
          <span className="icon github-icon"></span>
          <a target="_blank" href="https://github.com/bvfromru" rel="noreferrer">
            Vitaliy Boudkin
          </a>
          <a target="_blank" href="https://github.com/stanlys" rel="noreferrer">
            Sergey Chelnakov
          </a>
          <a target="_blank" href="https://github.com/Boffin-ux" rel="noreferrer">
            Boris Nizameev
          </a>
        </div>
        <a
          target="_blank"
          href="https://rs.school/react/"
          className="link rs-link"
          rel="noreferrer"
        ></a>
      </div>
    </footer>
  );
}
