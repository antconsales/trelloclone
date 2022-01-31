import './Routing.css';
import { Routes, Route } from "react-router-dom";
import Dashboardhook from './screens/Dashboard/DashboardHook';
import Homehook from './screens/home/HomeHook';

//REDUX
import applicationStore from './applicationStore';
import { Provider } from 'react-redux';

function Routing() {
  return (
    <>
      <Provider store={applicationStore}>

        <Routes>
          <Route path="/" index element={<Homehook />} />
          <Route path="dashboard/:id" element={<Dashboardhook />} />
        </Routes>

      </Provider>
    </>
  );
}

export default Routing;
