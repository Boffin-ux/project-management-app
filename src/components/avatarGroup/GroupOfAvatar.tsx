import React, { FC } from 'react';
import { Box, Avatar, AvatarGroup } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IUser } from 'interfaces/user';

export interface GroupOfAvatarProps {
  userId: number;
  users: Array<IUser>;
}

export const GroupOfAvatar: FC<GroupOfAvatarProps> = ({ userId, users }) => {
  return (
    <Box display="flex" alignItems="center" sx={{ justifyContent: 'end', mt: 0.5 }}>
      <Avatar src="/static/images/avatar/1.jpg" />
      {users.length > 0 && (
        <>
          <ArrowForwardIosIcon />
          <AvatarGroup max={3}>
            {users.map((user, index) => (
              <Avatar
                key={index}
                src="/static/images/avatar/1.jpg"
                sx={{ width: 24, height: 24 }}
              />
            ))}
          </AvatarGroup>
        </>
      )}
    </Box>
  );
};
