const btnStyle = {
  textTransform: 'none',
  color: 'inherit',
  minWidth: '40px',
};

const toolbarStyle = {
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: { xs: '10px', sm: '20px 40px' },
  backgroundColor: '#333',
};

const navWrapStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  gap: { xs: '10px', sm: '20px' },
};

const titleStyle = { display: 'flex', flexGrow: 1, fontSize: '1.8rem' };
const subtitleStyle = { display: { xs: 'none', sm: 'flex' } };

export { btnStyle, toolbarStyle, titleStyle, subtitleStyle, navWrapStyle };
