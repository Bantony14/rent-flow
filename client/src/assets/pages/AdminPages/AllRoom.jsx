import { useState, useEffect } from "react";
import AddRoomForm from "../../components/AllRoom/AddRoomForm.jsx";
import RoomCard from "../../components/AllRoom/RoomCard.jsx";
import { getAllRoom } from "../../api/roomApi.js";
import LoadingScreen from "../../components/LoadingScreen.jsx";

function AllRoom() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState([]);

  const fetchRooms = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllRoom();
      console.log("res.data.room>>>", res.data.room);
      setRooms(res.data.room);
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    setFormData(structuredClone(rooms));
  }, [rooms]);

  console.log("formData>>", formData);

  const handleChangeDetails = (e, id) => {
    setFormData((prev) =>
      prev.map((room) => {
        return room._id === id
          ? { ...room, [e.target.name]: e.target.value }
          : room;
      }),
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <AddRoomForm />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-6">
        {rooms.length === 0 ? (
          <h2>No Rooms Found</h2>
        ) : (
          formData.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              editingId={editingId}
              setEditingId={setEditingId}
              handleChange={handleChangeDetails}
            />
          ))
        )}
      </div>
    </>
  );
}

export default AllRoom;
