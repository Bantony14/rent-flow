import { useState, useEffect } from "react";
import AddRoomForm from "../../components/AllRoom/AddRoomForm.jsx";
import RoomCard from "../../components/AllRoom/RoomCard.jsx";
import {
  deleteRoomApi,
  getAllRoom,
  roomDetailsUpdate,
  updateRoomImageApi,
} from "../../api/roomApi.js";
import LoadingScreen from "../../components/LoadingScreen.jsx";
import toast from "react-hot-toast";
import DeletePopup from "../../components/AllRoom/DeleteCard.jsx";

function AllRoom() {
  const [rooms, setRooms] = useState([]);
  const [roomLoading, setRoomLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState([]);
  const [editDataDetails, setEditDataDetails] = useState({});
  const [editImageDetails, setEditImageDetails] = useState([]);
  const [sendDataLoading, setSendDataLoading] = useState(null);
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [deleteRoomId, setDeleteRoomId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [getDeleteRoom, setGetDeleteRoom] = useState(null);

  const fetchRooms = async () => {
    setRoomLoading(true);
    setError("");
    try {
      const res = await getAllRoom();
      setRooms(res.data.room);
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setRoomLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    setFormData(structuredClone(rooms));
  }, [rooms]);

  //  this function only for details changes not images
  const handleChangeDetails = (e, id) => {
    const { name, value } = e.target;

    const finalValue = name === "Avaliablity" ? value === "true" : value;

    setFormData((prev) =>
      prev.map((room) =>
        room._id === id ? { ...room, [name]: finalValue } : room,
      ),
    );

    setEditDataDetails((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  // this function after click on cancle that will remain save data no changes

  function handleCancel() {
    setFormData(structuredClone(rooms));
  }

  // this is work for update details call api here

  async function updateRoomData(id) {
    try {
      setSendDataLoading(true);

      const res = await roomDetailsUpdate(id, editDataDetails);
      console.log(res?.data?.message);
      toast.success(res?.data?.message);
      setEditingId(null);
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setSendDataLoading(false);
    }
  }

  //  this function only update RoomImage

  function updateRoomImage(e, roomId, imageId) {
    const findRoom = formData.find((rooms) => rooms._id === roomId);

    const updateImage = findRoom.roomImage.map((image) =>
      image._id === imageId
        ? { ...image, secure_url: e.target.files[0] }
        : image,
    );
    setFormData((prev) =>
      prev.map((rooms) =>
        rooms._id === roomId ? { ...rooms, roomImage: updateImage } : rooms,
      ),
    );

    setEditImageDetails((prev) => {
      const exists = prev.some((img) => img.imageId === imageId);

      if (exists) {
        return prev.map((img) =>
          img.imageId === imageId ? { ...img, file: e.target.files[0] } : img,
        );
      }

      return [
        ...prev,
        {
          imageId,
          file: e.target.files[0],
        },
      ];
    });
  }

  //  this function has been send api to change image
  async function handleUpdateImage(id) {
    try {
      const formData = new FormData();

      editImageDetails.forEach((img) => {
        formData.append("images", img.file);
        formData.append("imageIds", img.imageId);
      });

      const res = await updateRoomImageApi(id, formData);

      toast.success(res.data.message);

      setEditImageDetails([]);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update room images",
      );
    }
  }

  console.log("editImageDetails>>>", editImageDetails);

  // this function delete Room API
  async function deleteRoom() {
    try {
      setDeleteLoading(true);
      const res = await deleteRoomApi(deleteRoomId);
      toast.success(res?.data?.message);
      setRooms((prev) => prev.filter((rooms) => rooms._id !== deleteRoomId));
      setShowDeleteCard(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
    }
  }

  //  this function get delete Room details

  function deleteRoomDetails() {
    setGetDeleteRoom(rooms.find((rooms) => rooms._id === deleteRoomId));
  }

  if (roomLoading) {
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
              handleUpdate={updateRoomData}
              sendDataLoading={sendDataLoading}
              setShowDeleteCard={setShowDeleteCard}
              setDeleteRoomId={setDeleteRoomId}
              handleCancel={handleCancel}
              deleteRoomDetails={deleteRoomDetails}
              updateRoomImage={updateRoomImage}
              handleUpdateImage={handleUpdateImage}
            />
          ))
        )}
        <DeletePopup
          open={showDeleteCard}
          setShowDeleteCard={setShowDeleteCard}
          onDelete={deleteRoom}
          loading={deleteLoading}
          room={getDeleteRoom}
        />
      </div>
    </>
  );
}

export default AllRoom;
