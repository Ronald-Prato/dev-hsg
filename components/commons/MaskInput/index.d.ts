export type MaskInputT = {
  mask:  string | (string | RegExp)[];
  maskChar: string;
  onChageHandler: (val: string) => void;
  type: string;
  value: string;
}
