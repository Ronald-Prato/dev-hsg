import { useContext } from "react";
import Context from "../../../globalState/context";

const COMPONENT_NAME = 'project-view';

const ProjectView = () => {
  const { state } = useContext(Context);
  const project = state.user_internal_data.currentProject;

  return (
    <div className={COMPONENT_NAME}>
      
    </div>
  );
};

export default ProjectView;
