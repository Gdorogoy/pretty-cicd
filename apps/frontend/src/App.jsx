import { useContext, useEffect, useState } from 'react';
import Header from './components/Header';
import Workflow from './components/Workflow';
import './App.css';
import AllWorkFlows from './components/AllWorkFlows';
import { io } from 'socket.io-client';
import { WorkflowContext } from './Context/Workflow';
import Alert from 'antd/es/alert/Alert';
import { notification } from 'antd';



const socket = io('http://localhost:3000/live');


function App() {
  const [view, setView] = useState('workflow-runs');
  const [selectedRunIndex, setSelectedRunIndex] = useState(0);
  const { setLastWorkflowId } = useContext(WorkflowContext);


  useEffect(() => {
    socket.on('update', (data) => {
      setLastWorkflowId(data.workflow_runs[0].id);
      notification.info({
        message: 'New Workflow Run',
        description: `A new run was detected!`,
        placement: 'topRight',
      });
    });
  }, [])

  const handleMenuSelect = (key) => {
    setView(key);
  };

  const handleSelectRun = (index) => {
    setSelectedRunIndex(index);
    setView('last-workflow');
  };

  return (
    <div className="app">
      <Header onMenuSelect={handleMenuSelect} />
      <main className="app-main">
        {view === 'last-workflow' && <Workflow num={selectedRunIndex} />}
        {view === 'workflow-runs' && <AllWorkFlows onRunSelect={handleSelectRun} />}
        {view === 'create-workflow' && <p style={{ padding: 24 }}>Create Workflow — coming soon</p>}
        {view === 'settings' && <p style={{ padding: 24 }}>Settings — coming soon</p>}
      </main>
    </div>
  );
}

export default App;
