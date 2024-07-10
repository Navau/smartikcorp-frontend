export type BasicModalProps = {
  show: boolean;
  size?: string | number;
  title?: string;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
};
