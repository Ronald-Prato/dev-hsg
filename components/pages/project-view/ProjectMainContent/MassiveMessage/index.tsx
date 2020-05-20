import { useContext, useState } from 'react';
import Context from '../../../../../globalState/context';

import { MassiveMessageStyles } from './styles';

import { CloseOutlined } from '@ant-design/icons';

import { MassiveMessagesT } from './index.d';

import Input from '../../../../commons/FomInput';
import Button from '../../../../commons/FormButton';
import { SendMassiveMessageService } from '../../../../../utils/dbUtils';

const COMPONENT_NAME = 'massive-message';

const MassiveMessage = ({closeSelf}: MassiveMessagesT) => {
  const { state } = useContext(Context);
  const project = state.user_internal_data.currentProject;
  const [fields, setFields] = useState({
    channel: { email: false, whatsapp: false },
    filter: false,
    message: '',
    filterValue: ''
  });

  const getFilterTitle: {[key: string]: string} = {
    "manzana": "Manzana",
    "torre": "Torre"
  };


  const sendMessage = () => {
    let data = {
      invitations: 0,
      message: fields.message,
      subject: 'Sujeto de prueba',
      id_project: project.id_project,
      wp: fields.channel.whatsapp ? 1 : 0,
      filters: {
        division_value: [fields.filterValue]
      }
    }
    console.log(data);
    SendMassiveMessageService({
      ...data
    })
      .then(res => {
        alert("Mensaje enviado");
        console.log(res);
      })
      .catch(err => {
        alert("Error");
        console.log(err);
      })
  }

  return (
    <div className={COMPONENT_NAME}>
      <div onClick={closeSelf} className={`${COMPONENT_NAME}__opacity`}/>

      <div className={`${COMPONENT_NAME}__main-section`}>

      <div onClick={closeSelf} className={`${COMPONENT_NAME}__main-section_close-icon`}>
        <CloseOutlined style={{color: '#c2c2c2', fontSize: '20px'}}/>
      </div>

        <div className={`${COMPONENT_NAME}__main-section_send-channel`}>
          <p className={`${COMPONENT_NAME}__main-section_send-channel_title`}> Enviar a través de </p>
          <div className={`${COMPONENT_NAME}__main-section_send-channel_options`}>
            <div className={`${COMPONENT_NAME}__main-section_send-channel_options_option`}>
              <p className={`${COMPONENT_NAME}__main-section_send-channel_options_option_text`}> Email </p>
              <input
                onChange={() => setFields({...fields, channel: {...fields.channel, email: !fields.channel.email}})}
                checked={fields.channel.email} 
                type='checkbox'/>
            </div>

            <div className={`${COMPONENT_NAME}__main-section_send-channel_options_option`}>
              <p className={`${COMPONENT_NAME}__main-section_send-channel_options_option_text`}> Whatsapp </p>
              <input
                onChange={() => setFields({...fields, channel: {...fields.channel, whatsapp: !fields.channel.whatsapp}})}
                checked={fields.channel.whatsapp} 
                type='checkbox'/>
            </div>
          </div>
        </div>

        

        <div className={`${COMPONENT_NAME}__main-section_filters`}>
          <div className={`${COMPONENT_NAME}__main-section_filters_top-part`}>
            <input onChange={() => setFields({...fields, filter: !fields.filter})} type='checkbox'/>
            <p className={`${COMPONENT_NAME}__main-section_filters_top-part_title`}> Filtrar por { getFilterTitle[project.division] } </p>
          </div>

          <div className={`${COMPONENT_NAME}__main-section_filters_active`}>
            {
              fields.filter &&
              <div className={`${COMPONENT_NAME}__main-section_filters_active_input-container`}>
                <Input type={'number'} onChangeHandler={e => setFields({...fields, filterValue: e})} />
              </div>
            }
          </div>
        </div>



        <div className={`${COMPONENT_NAME}__main-section_message`}>
          <p className={`${COMPONENT_NAME}__main-section_message_title`}> Escribe el mensaje: </p>
          <textarea onChange={e => setFields({...fields, message: e.target.value})} className={`${COMPONENT_NAME}__main-section_message_text-area`}/>
        </div>


        
        <div className={`${COMPONENT_NAME}__main-section_send-button`}>
          <div className={`${COMPONENT_NAME}__main-section_send-button_button-container`}>
            <Button message={'Enviar'} onClickHandler={() => sendMessage()}/>
          </div>
        </div>

      </div>

      <style jsx> {MassiveMessageStyles} </style>
    </div>
  );
};

export default MassiveMessage;
