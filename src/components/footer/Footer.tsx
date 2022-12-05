import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import RSIcon from '../../assets/img/RSSchool.svg';
import githubIcon from '../../assets/img/github.svg';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <Box component="footer" className="footer">
      <Grid
        container
        className={styles.wrap}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          padding: { xs: '10px 10px', sm: '15px 40px' },
        }}
      >
        <Box className={styles.copyright}>
          ©<span>2022</span>
        </Box>
        <Grid className={styles.team}>
          <Box
            component="img"
            src={githubIcon}
            className={`${styles.icon} ${styles.githubIcon}`}
            sx={{ gap: { xs: '10px', sm: '20px' } }}
          />

          <Box
            component={Link}
            className={styles.link}
            color="inherit"
            href="https://github.com/bvfromru"
            target="_blank"
          >
            <Typography variant="subtitle1" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              Vitaliy Boudkin
            </Typography>
            <Typography variant="subtitle1" sx={{ display: { xs: 'flex', sm: 'none' } }}>
              Bvfromru
            </Typography>
          </Box>

          <Box
            component={Link}
            className={styles.link}
            color="inherit"
            href="https://github.com/stanlys"
            target="_blank"
          >
            <Typography variant="subtitle1" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              Sergey Chelnakov
            </Typography>
            <Typography variant="subtitle1" sx={{ display: { xs: 'flex', sm: 'none' } }}>
              Stanlys
            </Typography>
          </Box>

          <Box
            component={Link}
            className={styles.link}
            color="inherit"
            href="https://github.com/Boffin-ux"
            target="_blank"
          >
            <Typography variant="subtitle1" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              Boris Nizameev
            </Typography>
            <Typography variant="subtitle1" sx={{ display: { xs: 'flex', sm: 'none' } }}>
              Boffin-ux
            </Typography>
          </Box>
        </Grid>
        <Box component={Link} href="https://rs.school/react/" target="_blank">
          <Box component="img" src={RSIcon} className={`${styles.link} ${styles.rsLink}`} />
        </Box>
      </Grid>
    </Box>
  );
}
