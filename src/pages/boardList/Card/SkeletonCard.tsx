import { Box, Card, CardActions, CardContent, Divider, Skeleton, Typography } from '@mui/material';
import React from 'react';
import styles from './BoardCard.module.scss';

export const SkeletonCard = () => {
  return (
    <Card className={styles.card} sx={{ width: { xs: '100%', sm: '420px' }, margin: 2 }}>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
        <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ p: 2, mr: 2 }} />
        <Skeleton animation="wave" variant="rectangular" width="100%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
      <Divider variant="inset" component="p" />
      <CardContent className={styles.content}>
        <Skeleton animation="wave" variant="rectangular" width="100%" height={97} sx={{ p: 2 }}>
          <Typography>.</Typography>
        </Skeleton>
      </CardContent>
      <CardActions className={styles.action}>
        <Skeleton animation="wave" variant="rectangular" width="100%" height={20} sx={{ p: 2.5 }}>
          <Typography>.</Typography>
        </Skeleton>
      </CardActions>
    </Card>
  );
};
