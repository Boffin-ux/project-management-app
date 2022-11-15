import React from 'react';
import styles from './footer.module.scss';
import { Box } from '@mui/material';
import RSIcon from '../../assets/img/RSSchool.svg';
import githubIcon from '../../assets/img/github.svg';

export default function Footer() {
  return (
    <Box component="footer" className="footer">
      <Box className={styles.wrap}>
        <Box className={styles.copyright}>
          ©<span>2022</span>
        </Box>
        <Box className={styles.team}>
          <img src={githubIcon} className={`${styles.icon} ${styles.githubIcon}`} />

          <Box component="a" href="https://github.com/bvfromru" target="_blank">
            Vitaliy Boudkin
          </Box>

          <Box component="a" href="https://github.com/stanlys" target="_blank">
            Sergey Chelnakov
          </Box>

          <Box component="a" href="https://github.com/Boffin-ux" target="_blank">
            Boris Nizameev
          </Box>
        </Box>
        <Box component="a" href="https://rs.school/react/" target="_blank">
          <img src={RSIcon} className={`${styles.link} ${styles.rsLink}`} />
        </Box>
      </Box>
    </Box>
  );
}
