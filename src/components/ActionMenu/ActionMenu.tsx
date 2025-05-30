'use client';

import { FC, ReactNode, useState } from 'react';
import {
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  PopoverOrigin,
} from '@mui/material';
import { DotsIcon } from '@/assets/icons/icons';

interface IActionMenuProps {
  options: Array<{
    title: string;
    action: () => unknown;
    icon?: ReactNode;
    loading?: boolean;
    disabled?: boolean;
  }>;
  customIcon?: ReactNode;
  direction?: 'bottom' | 'top';
  disabled?: boolean;
}

export const ActionMenu: FC<IActionMenuProps> = ({
  options,
  customIcon,
  direction = 'bottom',
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const anchorSettings = (() => {
    switch (direction) {
      case 'bottom':
        return {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          } as PopoverOrigin,
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          } as PopoverOrigin,
        };
      case 'top':
        return {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
          } as PopoverOrigin,
          transformOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          } as PopoverOrigin,
        };
      default:
        return undefined;
    }
  })();

  return (
    <>
      <IconButton
        disabled={disabled}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {customIcon ? (
          customIcon
        ) : (
          <DotsIcon className='dark:text-white' size={15} />
        )}
      </IconButton>
      <Menu
        anchorOrigin={anchorSettings!.anchorOrigin}
        transformOrigin={anchorSettings!.transformOrigin}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        sx={{ position: 'absolute' }}
      >
        {options.map(({ action, title, icon, loading, disabled }) => (
          <MenuItem
            key={title}
            disabled={disabled || loading}
            sx={{ gap: 1 }}
            onClick={async () => {
              await action();
              setAnchorEl(null);
            }}
          >
            <ListItemText>{title}</ListItemText>
            <ListItemIcon sx={{ minWidth: 'auto !important' }}>
              {loading ? <CircularProgress size={20} /> : icon}
            </ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
