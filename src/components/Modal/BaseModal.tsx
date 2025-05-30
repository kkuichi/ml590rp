import React, { FC, ReactNode } from 'react';
import { Grid2, Modal, ModalProps, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  width: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  py: { xs: 1.5, md: 3 },
  px: { xs: 2, md: 4 },
};

interface IBaseModalProps extends Omit<ModalProps, 'children'> {
  children: ReactNode;
  onSubmit?: () => void;
  title: string;
}

export const BaseModal: FC<IBaseModalProps> = ({
  children,
  title,
  ...props
}) => (
  <Modal {...props}>
    <Grid2 sx={style} container direction='column' gap={{ xs: 0.5, md: 1 }}>
      <Typography variant='h6'>{title}</Typography>
      {children}
    </Grid2>
  </Modal>
);
