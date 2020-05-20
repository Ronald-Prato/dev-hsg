export type CollaboratorsT = {
  modules?: string[];
  goToSummary: (state: boolean) => void;
  setHideFromChild: (state: boolean) => void;
  fromModal?: boolean;
};

export type SinglePersonT = {
  receiver_address: string;
  id_project: number;
  type_user: string;
  area?: string,
  role?: string,
  permissions?: {
      Comunicaciones: string,
  },
};

export type InfoFormT = {
  modules?: string[];
  renderOption: string;
  goBack: () => void;
  activeButton: () => void;
};
