import React, { FC } from 'react';
import { Box, Avatar, AvatarGroup } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IUser } from 'interfaces/users';

export interface GroupOfAvatarProps {
  _id: string;
  users: Array<string>;
}

export const GroupOfAvatar: FC<GroupOfAvatarProps> = ({ _id, users }) => {
  return (
    <Box display="flex" alignItems="center" sx={{ justifyContent: 'end', mt: 0.5 }}>
      <Avatar />
      {users.length > 0 && (
        <>
          <ArrowForwardIosIcon />
          <AvatarGroup max={3}>
            {users.map((user, index) => (
              <Avatar key={index} sx={{ width: 24, height: 24 }} />
            ))}
          </AvatarGroup>
        </>
      )}
    </Box>
  );
};
