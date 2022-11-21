import React from 'react';
import { Box, Link } from '@mui/material';
import RSIcon from '../../assets/img/RSSchool.svg';
import githubIcon from '../../assets/img/github.svg';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <Box component="footer" className="footer">
      <Box className={styles.wrap}>
        <Box className={styles.copyright}>
          ©<span>2022</span>
        </Box>
        <Box className={styles.team}>
          <Box component="img" src={githubIcon} className={`${styles.icon} ${styles.githubIcon}`} />

          <Box
            component={Link}
            className={styles.link}
            color="inherit"
            href="https://github.com/bvfromru"
            target="_blank"
          >
            Vitaliy Boudkin
          </Box>

          <Box
            component={Link}
            className={styles.link}
            color="inherit"
            href="https://github.com/stanlys"
            target="_blank"
          >
            Sergey Chelnakov
          </Box>

          <Box
            component={Link}
            className={styles.link}
            color="inherit"
            href="https://github.com/Boffin-ux"
            target="_blank"
          >
            Boris Nizameev
          </Box>
        </Box>
        <Box component={Link} href="https://rs.school/react/" target="_blank">
          <Box component="img" src={RSIcon} className={`${styles.link} ${styles.rsLink}`} />
        </Box>
      </Box>
    </Box>
  );
}
