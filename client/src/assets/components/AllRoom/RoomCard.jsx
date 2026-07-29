import { useState } from "react";
import { Pencil } from "lucide-react";

const RoomCard = ({ room, editingId, setEditingId, handleChange }) => {
  const isEditing = editingId === room._id;

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border">
        <div className="flex justify-end p-4">
          <button
            onClick={() =>
              setEditingId(editingId === room._id ? null : room._id)
            }
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {isEditing ? (
          <div className="p-5 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              {room.roomImage.map((image) => (
                <label
                  key={image._id}
                  htmlFor={image._id}
                  className="relative cursor-pointer"
                >
                  <img
                    src={image.secure_url}
                    alt=""
                    className="w-full h-32 object-cover rounded-xl border"
                  />

                  <input id={image._id} type="file" className="hidden" />
                </label>
              ))}
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={room.room}
                name="room"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) => handleChange(e, room._id)}
              />

              <input
                type="text"
                value={room.rent}
                name="rent"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) => handleChange(e, room._id)}
              />

              <input
                type="text"
                value={room.buildingName}
                name="buildingName"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) => handleChange(e, room._id)}
              />

              <textarea
                value={room.address}
                name="address"
                rows={3}
                className="w-full border rounded-lg px-4 py-2 resize-none"
                onChange={(e) => handleChange(e, room._id)}
              />

              <input
                type="text"
                value={room.Avaliablity}
                name="Avaliablity"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) => handleChange(e, room._id)}
              />
            </div>

            <button className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold">
              Save Changes
            </button>
          </div>
        ) : (
          <div className="p-5">
            <div className="grid grid-cols-2 gap-3">
              {room.roomImage.map((image) => (
                <img
                  key={image._id}
                  src={image.secure_url}
                  alt=""
                  className="w-full h-32 object-cover rounded-xl"
                />
              ))}
            </div>

            <div className="mt-5 space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span className="font-semibold">Room</span>
                <span>{room.room}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Building</span>
                <span>{room.buildingName}</span>
              </div>

              <div>
                <p className="font-semibold mb-1">Address</p>
                <p className="text-gray-600">{room.address}</p>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Status</span>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    room.Avaliablity
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {room.Avaliablity ? "Available" : "Occupied"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Rent</span>
                <span className="text-blue-600 font-bold">₹{room.rent}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RoomCard;
