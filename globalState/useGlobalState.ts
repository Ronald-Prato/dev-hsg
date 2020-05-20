import { useState } from 'react'

// El estado general es este objeto. Se recomienda mantener esta estructura como contenedor de arrays, strings, otros objetos...etc
const State = {
    signup: {
      email: '',
      password: ''
    },
    user_internal_data: {
      id: '',
      email: '',
      projects: {},
      currentProject: {},
      projectsLoaded: false
    },
    project_wizard: {
      optionalAnswers: {},
      settings: {},
      collaborators: []
    },
    sideEmail: ''
}

const useGlobalState = () => {
  const [state, setState] = useState(State);

  const actions = (action: any) => {
    const { type, payload } = action;

    if (type === "setState") {
      return setState(payload)
    }
  }
  return { state, actions }
}

export default useGlobalState;
