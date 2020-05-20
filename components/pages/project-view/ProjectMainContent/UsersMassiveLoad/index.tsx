import React, { useState, useContext } from 'react';
import { UsersMassiveLoadStyles } from './styles';

import { FilePond } from 'react-filepond';

import Button from '../../../../commons/FormButton';

import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';

import { UsersMassiveLoadT } from './index.d';
import { SaveInBucket } from '../../../../../utils/storageUtils';
import { SendFileInfo } from '../../../../../utils/dbUtils';

import Context from '../../../../../globalState/context';

const COMPONENT_NAME = 'users-massive-load';

let fileInitialProps: File;


const UserMassiveLoad = ({translation, hide}: UsersMassiveLoadT) => {
  const { state } = useContext(Context);
  const [file, setFile] = useState(fileInitialProps);
  const [showFilepond, setShowFilepond] = useState(true);
  const project = state.user_internal_data.currentProject;
  
  const sendFile = async () => {
    setShowFilepond(false);
    await SaveInBucket(`massive-load/${file.name}`, file)
      .then(() => {
        SendFileInfo(file.name, project.id_project.toString(), project.division, project.id_admin_type)
          .then(res => {
            hide();
            console.log(res);
            setShowFilepond(true);
            setTimeout(() => alert("Archivo cargado"), 1000); 
            setFile(fileInitialProps);
          })
          .catch(err => {
            alert("Hubo un error enviando la información del archivo");
            console.log(err);
          })
      })
      .catch(err => console.error('error: ', err));
  };


  return (
    <div style={{transform: translation}} className={COMPONENT_NAME}>
      <p className={`${COMPONENT_NAME}_title`}> Subir archivo </p>

      <div className={`${COMPONENT_NAME}_filepond`}>
        {
          showFilepond ?
          <FilePond
            labelIdle='Arrastra o selecciona un archivo'
            allowMultiple={false}
            onupdatefiles={e => {
              setFile(e.map(x => x.file)[0]);
            }}
          />
        :
        <div className={`${COMPONENT_NAME}_filepond_loading-icon`}>
          <LoadingOutlined style={{color: '#32a852', fontSize: '30px', alignSelf: 'center'}}/>
        </div>
        }
      </div>

      <div className={`${COMPONENT_NAME}_button`}>
        <Button message={'Subir'} onClickHandler={sendFile} />
      </div>

      <div onClick={hide} className={`${COMPONENT_NAME}_close-button`}>
        <CloseOutlined style={{color: '#c2c2c2', fontSize: '20px'}} />
      </div>
      <style jsx> {UsersMassiveLoadStyles} </style>
    </div>
  );
};

export default UserMassiveLoad;
