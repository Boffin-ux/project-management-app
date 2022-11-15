import React from 'react';
import {
  Grid,
  Paper,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Container,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import FolderIcon from '@mui/icons-material/Folder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import EditIcon from '@mui/icons-material/Edit';

// function refreshMessages(): MessageExample[] {
//   const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

//   return Array.from(new Array(50)).map(
//     () => messageExamples[getRandomInt(messageExamples.length)],
//   );
// }

const BoardItem2 = () => {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = React.useState(null);

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    // setMessages(refreshMessages());
  }, [value, setMessages]);

  return (
    <Box sx={{ overflow: 'scroll' }}>
      <h3>Element</h3>
      <Grid wrap="nowrap" spacing={5} gap={1} direction="row" container sx={{ m: 5 }}>
        <Box>
          {'11111111111111111111111111111111111111'.split('').map((el, index) => (
            <Paper key={index} sx={{ m: 1 }}>
              {el}
            </Paper>
          ))}
        </Box>
        <Paper sx={{ width: 400 }} ref={ref}>
          <Box sx={{ background: '#ff3421' }}>TITLE</Box>
          {'11111111111111111111111111111111111111'.split('').map((el, index) => (
            <Paper key={index} sx={{ m: 1 }}>
              {el}
              <Box display="flex" alignItems="center">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                {'>'}
                <AvatarGroup max={4}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                  <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                </AvatarGroup>
              </Box>
            </Paper>
          ))}
          <em>wqewq</em>
        </Paper>
        <Paper elevation={1} sx={{ width: 400, height: '88vh' }}>
          2
        </Paper>
        <Paper elevation={1} sx={{ width: 400, height: '88vh' }}>
          3
        </Paper>
        <Paper elevation={1} sx={{ width: 400, height: '88vh' }}>
          4
        </Paper>
        <Paper elevation={1} sx={{ width: 400, height: '88vh' }}>
          5
        </Paper>
      </Grid>
    </Box>
  );
};

export default BoardItem2;
