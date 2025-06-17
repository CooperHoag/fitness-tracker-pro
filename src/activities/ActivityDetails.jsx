import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function ActivityDetails() {
  const { activityId} = useParams();
  const { data: activity} = useQuery(`/activities/${activityId}`);
  const { token } = useAuth();
  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation("DELETE", "/activities/" + ["activities"]);

  if (loading) return <p>Loading activity details...</p>;
  if (error) return <p>Sorry! {error}</p>;
  if (!activity) return <p>No activity found.</p>;

  return (
    <>
      <h1>{activity.name}</h1>
      <p>Description: {activity.description}</p>
      <p>Created By: {activity.creatorName}</p>
      {token && (
        <button onClick={() => deleteActivity()}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
    </>
  )
}