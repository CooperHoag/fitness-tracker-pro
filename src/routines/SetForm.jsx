import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import { useState } from "react";

/** Users can create new activities with a name and description. */
export default function SetForm({ routineId, refetchRoutine }) {
  const { 
    data: activities, 
    loading: loadingActivities, 
    error: errorActivities 
  } = useQuery("/activities", "activities");

  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");

  const {
    mutate: addSet,
    loading,
    error,
  } = useMutation("POST", "/sets", ["routines"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await addSet({
      activityId: Number(activityId),
      count: Number(count),
      routineId: Number(routineId),
    });
  
    refetchRoutine();
    setActivityId("");
    setCount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a set</h2>

      <label>
        Activity
        <select
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          required
        >
          <option value="">Select an activity</option>
          {activities?.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Count
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          name="count"
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add set"}
      </button>

      {error && <output>{error.message}</output>}
    </form>
  );
}