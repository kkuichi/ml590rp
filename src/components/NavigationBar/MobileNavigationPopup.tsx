import React, { FC, useState } from 'react';
import Link from 'next/link';
import {
  IconButton,
  ListItemButton,
  ListItemIcon,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';
import { MenuIcon } from '@/assets/icons/icons';
import { NAVIGATION_ITEMS } from './constants';
import { Settings } from './Settings';

interface IMobileNavigationPopupProps {
  pathname: string;
}

export const MobileNavigationPopup: FC<IMobileNavigationPopupProps> = ({
  pathname,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color={anchorEl ? 'primary' : 'secondary'}
      >
        <MenuIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ mt: 1 }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              width: '90vw',
              gap: 1,
              alignItems: 'start',
              p: 1,
            },
          },
        }}
      >
        <MenuList sx={{ width: '100%' }}>
          {NAVIGATION_ITEMS.map(({ path, icon, title }) => (
            <ListItemButton
              LinkComponent={Link}
              href={path}
              sx={{ width: '100%', borderRadius: 3 }}
              key={title}
              selected={pathname.includes(path)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <Typography>{title}</Typography>
            </ListItemButton>
          ))}
        </MenuList>
        <Settings />
      </Popover>
    </>
  );
};
