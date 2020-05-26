import { useState, useEffect } from 'react';

import { DropListStyles } from './styles';

import { DropListT } from './index.d';
import { PRIMARY_COLOR } from '../../../globalConfig';

const COMPONENT_NAME = 'drop-list';

const DropList = ({maxRender, cityList, placeholder, onChangeHandler, savedOption}: DropListT) => {
  const [value, setValue] = useState(placeholder);
  const [filter, setFilter] = useState('');
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    savedOption && setValue(cityList?.filter(x => x.value === savedOption)[0].visibleName);
  }, [])
  
  const changeValue = (city: {visibleName: string; value: string;}) => {
    onChangeHandler(city.value);
    setShowList(false);
    setValue(city.visibleName);
  };

  return (
    <div className={COMPONENT_NAME}>
      <div onClick={() => setShowList(true)} className={`${COMPONENT_NAME}__main-input`}>
        <p style={{color: value === placeholder ? 'rgba(0, 0, 0, .2)' : PRIMARY_COLOR}} className={`${COMPONENT_NAME}__main-input_text`}> {value} </p>
      </div>

      {
        showList &&
        <div className={`${COMPONENT_NAME}__list`}>
          <input value={filter} onChange={e => setFilter(e.target.value)} placeholder={'Buscar ciudad'} className={`${COMPONENT_NAME}__list_input`} />

          <div className={`${COMPONENT_NAME}__list_options`}>
            {
              !filter.length ?
              cityList?.map((city, index) =>
                maxRender && (index < maxRender) &&
                <p onClick={() => changeValue(city)} className={`${COMPONENT_NAME}__list_options_single-option`} key={index}> {city.visibleName} </p>
              )
              :
              cityList?.filter(city => city.value.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map((city, index) =>
                maxRender && (index < maxRender) &&
                <p onClick={() => changeValue(city)} className={`${COMPONENT_NAME}__list_options_single-option`} key={index}> {city.visibleName} </p>
              )
            }
            <p className={`${COMPONENT_NAME}__list_options_single-option`}> ... </p>
          </div>
        </div>
      }
      

      <style jsx> {DropListStyles} </style>
    </div>
  );
};

export default DropList;
