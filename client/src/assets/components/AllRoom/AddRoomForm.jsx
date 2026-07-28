import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { nanoid } from "nanoid";
import { addRoom } from "../../api/roomApi";
import toast from "react-hot-toast";

function AddRoomForm() {
  const { user } = useContext(AuthContext);
  const [roomImage, setRoomImage] = useState([{ id: nanoid(), roomImage: "" }]);
  const [showInput, setShowInput] = useState(false);
  const [buildingName, setBuildingName] = useState("");
  const [roomdetails, setRoomDetails] = useState({
    rent: "",
    room: "",
    buildingName: "",
    address: "",
    ownerName: "",
  });

  function addImage() {
    setRoomImage((prev) => [...prev, { id: nanoid(), roomImage: "" }]);
  }

  function handleImageChange(e, id) {
    setRoomImage((prev) =>
      prev.map((value) =>
        value.id === id ? { ...value, roomImage: e.target.files[0] } : value,
      ),
    );
  }

  function handleChange(e) {
    setRoomDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  //   ============== call api to save room in database ==============
  async function addRoom(e) {
    e.preventDefault();
    console.log("jjgjg");
    try {
      const res = await addRoom(data);
      toast.success("room added successfully");
    } catch (error) {
      toast.error("failed to Add room");
    }
  }
  return (
    <div>
      <form className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="flex flex-wrap gap-4">
          {roomImage.map((v) => (
            <label
              key={v.id}
              htmlFor={v.id}
              className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer overflow-hidden hover:border-blue-500 transition flex items-center justify-center bg-gray-50"
            >
              {v.roomImage ? (
                <img
                  src={URL.createObjectURL(v.roomImage)}
                  alt="room"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl text-gray-400 font-light">+</span>
              )}

              <input
                id={v.id}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, v.id)}
              />
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={addImage}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add Image
        </button>

        {/* =============== from here input box ================ */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 font-medium">Room Number</label>
            <input
              type="number"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="room"
              value={roomdetails.room}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Rent</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="rent"
              value={roomdetails.rent}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Building</label>

            <select
              name="buildingName"
              className="w-full border rounded-lg px-4 py-2 mb-3"
              value={roomdetails.buildingName}
              onChange={(e) => handleChange(e)}
            >
              <option>Select Building</option>

              {user?.properties?.map((building) => (
                <option key={building} value={building}>
                  {building}
                </option>
              ))}
            </select>

            {showInput && (
              <input
                type="text"
                placeholder="Enter building name"
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            <button
              type="button"
              onClick={() => setShowInput((prev) => !prev)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {showInput ? "Cancel" : "+ Add Building"}
            </button>
          </div>

          <div>
            <label className="block mb-1 font-medium">Owner Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="ownerName"
              value={roomdetails.ownerName}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>

            <textarea
              name="address"
              rows={4}
              placeholder="Enter full address..."
              className="w-full border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roomdetails.address}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          onClick={(e) => addRoom(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddRoomForm;
