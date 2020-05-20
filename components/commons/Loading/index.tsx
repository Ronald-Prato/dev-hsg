import { LoadingOutlined } from '@ant-design/icons';

import { LoadingStyles } from './styles';

const COMPONENT_NAME = 'loading';

type initialProps = {message: string};

const Loading = ({message}: initialProps) => 
  <div className={COMPONENT_NAME}>
    <LoadingOutlined style={{color: '#32a852', fontSize: '60px'}} />
    <p className={`${COMPONENT_NAME}_text`}> { message } </p> 

    <style jsx> {LoadingStyles} </style>
  </div>

export default Loading;
