import { createContext, useState, useContext } from 'react'


export const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
    const [lastWorkflowId, setLastWorkflowId] = useState(null);


    return (
        <WorkflowContext.Provider
            value={{
                lastWorkflowId,
                setLastWorkflowId
            }}
        >
            {children}
        </WorkflowContext.Provider>
    )
}

export default WorkflowProvider