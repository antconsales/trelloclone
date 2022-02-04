import './Routing.css';
import { Routes, Route } from "react-router-dom";
import DashboardHook from './screens/Dashboard/DashboardHook';
import HomeHook from './screens/home/HomeHook';

//REDUX
import applicationStore from './applicationStore';
import { Provider } from 'react-redux';

function Routing() {
  return (
    <>
      <Provider store={applicationStore}>

        <Routes>
          <Route path="/" index element={<HomeHook />} />
          <Route path="dashboard/:id" element={<DashboardHook />} />
        </Routes>

      </Provider>
    </>
  );
}

export default Routing;
