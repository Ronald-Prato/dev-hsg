export type WizardActionsT = {
  onClickNext: () => void;
  onClickPrevious: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isValid: boolean;
}
