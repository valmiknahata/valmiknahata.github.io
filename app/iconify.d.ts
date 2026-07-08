declare namespace JSX {
  interface IntrinsicElements {
    'iconify-icon': IconifyIconProps;
  }
}

interface IconifyIconProps {
  icon: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  [key: string]: any;
}
