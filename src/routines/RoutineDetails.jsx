import { useParams, useNavigate } from "react-router";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";
import SetForm from "./SetForm";

export default function RoutineDetails() {
  const { routineId} = useParams();
  const { 
    data: routine,
    loading,
    error,
    refetch,
   } = useQuery(`/routines/${routineId}`, `routine-${routineId}`);

  const { token } = useAuth();
  const navigate = useNavigate();
  const {
    mutate: deleteRoutine,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", `/routines/${routineId}`, ["routines"]);

  const {
    mutate: deleteSet,
    loading: deletingSet,
    error: deleteSetError,
  } = useMutation("DELETE", "", ["routines"]);

  const handleDeleteSet = async (setId) => {
    await deleteSet(`/sets/${setId}`);
    refetch(); // refresh after deletion
  };
  
  
  const removeRoutine=() => {
    deleteRoutine();
    navigate("/routines")
  }

  if (loading) return <p>Loading routine details...</p>;
  if (error) return <p>Sorry! {error}</p>;
  if (!routine) return <p>No routine found.</p>;

  return (
    <>
      <h1>{routine.name}</h1>
      <p><strong>Created By:</strong> {routine.creatorName}</p>
      <p><strong>Routine Goal:</strong> {routine.goal}</p>
      {token && (
        <button onClick={ removeRoutine }>
          {deleting ? "Deleting..." : deleteError ? Error : "Delete Routine"}
        </button>
      )}
      <h2>Sets:</h2>
      {routine.sets.length === 0 ? (
        <p>This routine doesn't have any sets. Add one?</p>
      ) : (
        routine.sets.map((set) => (
          <p key={set.id}>
            {set.name} x {set.count}
            {token && (
              <button
                onClick={() => handleDeleteSet(set.id)}
                disabled={deletingSet}
                style={{ marginLeft: "10px" }}
              >
                {deletingSet ? "Deleting..." : "Delete"}
              </button>
            )}
          </p>
        ))
      )}
      {token && <SetForm routineId={routineId} refetchRoutine={refetch} />}
    </>
  )
};