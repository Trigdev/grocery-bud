export type ListItemProps = {
  id: string;
  title: string;
};

export type ListComponentProps = {
  items: ListItemProps[];
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
};

export type AlertProps = {
  show: boolean;
  msg: string;
  type: string;
};

export type AlertComponentProps = {
  show: boolean;
  msg: string;
  type: string;
  removeAlert: (show: boolean, type: string, msg: string) => void;
  list: ListItemProps[];
};
