import { FC, ReactNode } from 'react';
import { Grid2 } from '@mui/material';


interface ITabPanelProps {
  index: number;
  value: number;
  children: ReactNode;
}

export const TabPanel: FC<ITabPanelProps> = ({ value, index, children }) => {
  const isEqual = value === index;

  return (
    <Grid2 width='100%' height='100%' role='tabpanel' overflow='hidden' hidden={!isEqual}>
      {isEqual ? children : null}
    </Grid2>
  );
};