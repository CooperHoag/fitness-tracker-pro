import useQuery from "../api/useQuery";
import { Link } from "react-router";

/** Shows a list of activities. */
export default function RoutineList() {
  const {
    data: routines,
    loading,
    error,
  } = useQuery("/routines", "routines");

  if (loading || !routines) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {routines.map((routine) => (
        <RoutineListItem key={routine.id} routine={routine} />
      ))}
    </ul>
  );
}

/** Shows a single routine. Logged-in users will also see a delete button. */
function RoutineListItem({ routine }) {


  return (
    <li>
      <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
    </li>
  );
}