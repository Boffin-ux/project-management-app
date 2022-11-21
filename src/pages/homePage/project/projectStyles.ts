const btnStyle = {
  textTransform: ' none',
  fontSize: '20px',
  width: '200px',
  height: '40px',
  border: '.1rem solid #fff',
  backgroundColor: 'transparent',
  '&:hover': {
    boxShadow: 'inset 0 0 1rem .2rem rgba(255 255 255 / 85%)',
  },
};

const titleStyle = {
  fontWeight: 'bold',
  fontSize: { xs: '1.6rem', sm: '1.7rem', md: '2.2rem', lg: '2.6rem' },
  textAlign: { xs: 'center', md: 'inherit' },
};

const infoWrapStyle = {
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: { xs: 'center', md: 'baseline' },
  height: '255px',
};

const infoStyle = {
  textAlign: { xs: 'center', md: 'inherit' },
  fontSize: { xs: '1rem', sm: '1.2rem' },
  lineHeight: '1.4rem',
};

export { titleStyle, infoWrapStyle, infoStyle, btnStyle };
