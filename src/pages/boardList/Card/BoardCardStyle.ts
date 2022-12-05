import { SxProps, Theme } from '@mui/material';

export const cardGrid: SxProps<Theme> = {
  width: { xs: '100%', sm: '350px', md: '420px' },
  minHeight: '200px',
  m: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export const cardRow: SxProps<Theme> = {
  width: { xs: '100%', sm: '75%' },
  display: 'flex',
  m: 2,
  minHeight: '50px',
  justifyContent: 'space-between',
  flexDirection: 'column',
};

export const cardHeadGrid: SxProps<Theme> = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignmentBaseline: 'true',
};

export const cardHeadRow: SxProps<Theme> = {
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const actionGrid: SxProps<Theme> = {
  fontSize: 15,
  justifyContent: 'space-between',
  p: '8px 16px 16px',
};

export const actionRow: SxProps<Theme> = {
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'flex-end',
  p: '8px 16px 16px',
};
