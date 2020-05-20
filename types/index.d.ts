export type AppProps = {
  Component: NextComponentType<NextPageContext, {}, {}>;
  pageProps: Object;
  isAuthenticated: boolean;
  pathname: string;
};

export type FormInputT = {
  type: 'string' | 'password' | 'number' | 'email';
  onChangeHandler: (value: string) => void;
  title?: string;
  centered?: boolean;
  maxLength?: number;
  value?: string | number;
};

export type FormButtonT = {
  message: string;
  onClickHandler: () => void;
  disabled?: boolean;
};

export type NewCreatedUser = {
  id_user: string;
  name: string;
  email: string;
  phone_number: string;
  creation_date: string;
  modification_date: string;
  type_user: string;
  id_project: string;
  areas: string;
  role: string;
  permissions: any;
};

export type NewNormalCreateUser = {
  division_value: string;
  residential_unit_number: string;
  email: string;
  phone_number: number;
  id_user: string;
  name: string;
  creation_date: string;
  modification_date: string;
  type_user: string;
  id_project: string;
};

export type NewCreatedProject = {
  id_user: string,
  business_name: string,
  nit: number,
  address: string,
  phone_number: number,
  creation_date: string,
  modification_date: string,
  url_logo: string,
  admin_type: string,
  residential_units: number,
  verification_nit: number,
  email: string,
  division: string,
  country: string,
  city: string
};

export type Collaborators = {
  usersArray: {
    receiver_address: string,
    id_project: string,
    area: string,
    role: string,
    permissions: {[key: string]: string},
    type_user: string,
    creation_date: string,
    modification_date: string,
    admin_type: string,
    division: string,
    invitations: number
  }[]; 
};

export type QuestionStruct = {
  id: number;
  icon: string;
  type: string;
  key: string;
  visibleName: string;
  mask?: string | undefined;
  maskChar?: string | undefined;
  options?: {
    icon: string;
    name: string;
    value: string;
  }[] | undefined;
  optionalAnswer?: boolean | undefined;
  multipleAnswers?: boolean | undefined;
  modules?: string[] | undefined;
}

export type MassiveMessagesT = {
  invitations: number;
  message: string;
  subject: string;
  id_project: number;
  wp: number;
  filters: {
    division_value: string[] | string
  }
}
