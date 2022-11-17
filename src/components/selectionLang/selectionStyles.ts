const selectStyle = {
  fontSize: '.9rem',
  transition: 'all .4s',
  width: '60px',
  '&.Mui-selected': {
    backgroundColor: 'rgba(63, 191, 195, 0.8)',
    color: 'inherit',
  },
  '&:hover': {
    backgroundColor: 'rgb(0 0 0 / 30%)',
    color: 'inherit',
  },
};

const selectStyleGroup = { backgroundColor: '#fff', height: '40px' };

export { selectStyle, selectStyleGroup };
