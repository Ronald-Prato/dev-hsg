export type CardsT = {
  options?: {
    icon: string;
    name: string;
    value: string;
  }[];
  multipleAnswers?: boolean;
  onChangeHandler: (value: string) => void;
  value: string;
  optionalAnswer?: boolean;
  questionKey?: string;
};
