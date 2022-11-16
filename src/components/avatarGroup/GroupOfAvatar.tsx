import React, { FC } from 'react';
import { Box, Avatar, AvatarGroup } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface GroupOfAvatarProps {
  userId: number;
  users: Array<string>;
}

export const GroupOfAvatar: FC<GroupOfAvatarProps> = ({ userId, users }) => {
  return (
    <Box display="flex" alignItems="center" sx={{ justifyContent: 'end', mt: 1 }}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      {users.length > 0 && (
        <>
          <ArrowForwardIosIcon />
          <AvatarGroup max={2}>
            {users.map((user, index) => (
              <Avatar key={index} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            ))}
          </AvatarGroup>
        </>
      )}
    </Box>
  );
};
