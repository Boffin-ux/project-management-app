const wrapperStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1.2rem',
  flexDirection: { xs: 'column', sm: 'initial' },
  flexWrap: { xs: 'nowrap', sm: 'wrap' },
};

const infoWrapStyle = {
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: { xs: 'center', sm: 'flex-start' },
  order: { xs: 2, sm: 0 },
  height: { xs: '100%', sm: '255px' },
  gap: '25px',
};

const btnStyle = {
  textTransform: ' none',
  fontSize: '1.2rem',
  fontWeight: 600,
  border: '.1rem solid #fff',
  backgroundColor: 'transparent',

  '&:hover': {
    boxShadow: 'inset 0 0 1rem .2rem rgba(255 255 255 / 85%)',
  },
};

const titleStyle = {
  fontWeight: 'bold',
  fontSize: { xs: '1.6rem', sm: '1.7rem', md: '2.2rem', lg: '2.6rem' },
  textAlign: { xs: 'center', sm: 'inherit' },
};

const descriptionStyle = {
  paddingTop: '20px',
  textAlign: { xs: 'center', sm: 'inherit' },
};

const imgWrapStyle = { display: { xs: 'none', sm: 'flex' } };

export { wrapperStyle, infoWrapStyle, btnStyle, titleStyle, imgWrapStyle, descriptionStyle };
