import { createUserURL, createProjectURL, addCollaboratorsURL, listProjectsURL, sendFileInfoURL } from '../globalVariables';
import { NewCreatedUser, NewNormalCreateUser, NewCreatedProject, Collaborators, MassiveMessagesT } from '../types/index.d';
import Axios from 'axios';


export const CreateNewUserService = ({
  id_user,
  name,
  email,
  phone_number,
  creation_date,
  modification_date,
  type_user,
  id_project,
  areas,
  role,
  permissions
}: NewCreatedUser) => 
  Axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    url: createUserURL,
    data: {
      id_user,
      name,
      email,
      phone_number,
      creation_date,
      modification_date,
      type_user,
      id_project,
      areas,
      role,
      permissions
    }
  })

export const CreateNormalUser = ({
  division_value,
  residential_unit_number,
  email,
  phone_number,
  id_user,
  name,
  creation_date,
  modification_date,
  type_user,
  id_project
}: NewNormalCreateUser) =>
  Axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    url: createUserURL,
    data: {
      division_value,
      residential_unit_number,
      email,
      phone_number,
      id_user,
      name,
      creation_date,
      modification_date,
      type_user,
      id_project
    }
  })

export const CreateNewProjectService = ({
  id_user,
  business_name,
  nit,
  address,
  phone_number,
  creation_date,
  modification_date,
  url_logo,
  admin_type,
  residential_units,
  verification_nit,
  email,
  division,
  country,
  city
}: NewCreatedProject) => Axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  url: createProjectURL,
  data: {
    id_user,
    business_name,
    nit,
    address,
    phone_number,
    creation_date,
    modification_date,
    url_logo,
    admin_type,
    residential_units,
    verification_nit,
    email,
    division,
    country,
    city
  }
})


export const AddCollaboratorsService = ({usersArray}: Collaborators) => {
  let finalData = {
    users: usersArray
  };
  return (
    Axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: addCollaboratorsURL,
      data: finalData
    })
  )
}
  
export const ListProjects = (id_user: string) => {
  return (
    Axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: listProjectsURL,
      data: { id_user }
    })
  )
}
  
export const SendFileInfo = (filename: string, id_project: string, division: string, admin_type: number) => 
  Axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    url: sendFileInfoURL,
    data: {
      filename,
      id_project,
      division,
      admin_type
    }
  })

export const SendMassiveMessageService = ({
  invitations,
  message,
  subject,
  id_project,
  wp,
  filters
}: MassiveMessagesT) =>
  Axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    url: addCollaboratorsURL,
    data: {
      invitations,
      message,
      subject,
      id_project,
      wp,
      filters
    }
  })
