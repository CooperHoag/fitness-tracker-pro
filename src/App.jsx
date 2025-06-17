import { Route } from "react-router";
import { Routes } from "react-router";
import Error404 from "./Error404.jsx";
import Layout from "./layout/Layout.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import ActivitiesPage from "./activities/ActivitiesPage.jsx";
import ActivityDetails from "./activities/ActivityDetails.jsx";
// import ActivityList from "./activities/ActivityList.jsx";


/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return(
    <Routes>
      <Route element={<Layout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:activityId" element={<ActivityDetails />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  )
}
