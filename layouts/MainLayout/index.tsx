import { MainLayoutT } from './index.d';

import Header from '../../components/commons/Header';
import Sidebar from '../../components/commons/Sidebar';

import { MainLayoutStyles } from './styles';

const COMPONENT_NAME = 'main-layout';

const MainLayout: MainLayoutT = ({children}) => {
  return (   
    <div className={COMPONENT_NAME}>
      <section className={`${COMPONENT_NAME}__header`}>
        <Header />
      </section>

      <section className={`${COMPONENT_NAME}__side-bar`}>
        <Sidebar />
      </section>

      <section className={`${COMPONENT_NAME}__main-component`}>
        { children }
      </section>

      <style jsx> {MainLayoutStyles} </style>
    </div>
  );
};

export default MainLayout;
