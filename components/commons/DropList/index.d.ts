export type DropListT = {
  maxRender?: number;
  cityList?: {
    visibleName: string;
    value: string;
  }[];
  placeholder?: string;
  onChangeHandler: (val: string) => void;
  savedOption?: string;
};
