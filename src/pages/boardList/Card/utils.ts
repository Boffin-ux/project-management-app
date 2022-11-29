import { SxProps, Theme } from '@mui/material';

const generateRandomColor = (): number => Math.round(Math.random() * 255);

export const setRandomColor = (): string => {
  const r = Number(generateRandomColor()).toString(16);
  const g = Number(generateRandomColor()).toString(16);
  const b = Number(generateRandomColor()).toString(16);
  return `#${r}${g}${b}`;
};

export const cardGrid: SxProps<Theme> = {
  width: { xs: '100%', sm: '400px' },
  minHeight: '200px',
  m: 3,
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
  flexDirection: 'row',
};

export const cardHeadGrid: SxProps<Theme> = {
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignmentBaseline: 'true',
};

export const cardHeadRow: SxProps<Theme> = {
  justifyContent: 'space-between',
  flexDirection: 'column-reverse',
  alignItems: 'flex-start',
};

export const actionGrid: SxProps<Theme> = {
  fontSize: 15,
  justifyContent: 'space-between',
};

export const actionRow: SxProps<Theme> = {
  justifyContent: 'space-between',
  flexDirection: 'column-reverse',
  alignItems: 'flex-end',
};
