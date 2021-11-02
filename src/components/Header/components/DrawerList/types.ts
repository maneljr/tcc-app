import React from 'react';

export interface IDrawerList {
  toggleDrawer: () => void;
}

export interface IDrawerListItem {
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
}
