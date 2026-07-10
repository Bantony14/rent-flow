import cloudinary from "../config/cloudinary.connect.js"
import Room from "../models/room.model.js"
import fs from "fs/promises"
import ErrorHandler from "../utils/error.js"
import User from "../models/user.model.js"

export const roomCreate = async (req, res, next) => {
    const { buildingName, id, room } = req.body;

    try {
        const roomExist = await Room.findOne({
            room,
            buildingName,
        });

        if (roomExist) {
            return next(
                new ErrorHandler("Room already exists in this building", 400)
            );
        }

        const admin = await User.findById(id);

        if (!admin) {
            return next(new ErrorHandler("Admin not found", 404));
        }

        const newRoom = await Room.create(req.body);

        try {
            if (req.files?.length) {
                for (const file of req.files) {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: "roomImage",
                    });

                    newRoom.roomImage.push({
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    });

                    await fs.unlink(file.path);
                }
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }

        if (!admin.properties.includes(buildingName)) {
            admin.properties.push(buildingName);
        }

        await newRoom.save();
        await admin.save();

        res.status(200).json({
            success: true,
            message: "Room created successfully",
            room: newRoom,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};

export const roomDelete = async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
        return next(new ErrorHandler("room not found", 400))
    }
    try {

        const room = await Room.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "room delete updated sucessfully",

        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }

}

export const roomImageUpdate = async (req, res, next) => {
    const id = req.params.id
    const imageId = req.params.imageid


    if (!id) {
        return next(new ErrorHandler("please enter id  ", 400))
    }
    if (!imageId) {
        return next(new ErrorHandler("imageId does not exist ", 400))
    }

    try {
        const room = await Room.findById(id)

        if (!room) {
            return next(new ErrorHandler("room not have ", 400))
        }

        try {
            if (req.files && imageId) {
                console.log(room.roomImage)
                const updateImage = room.roomImage.find((room) => room._id.toString() === imageId)
                console.log(updateImage)
                // delete Cloudinary image 
                await cloudinary.uploader.destroy(updateImage.public_id)
                // upload new image on cloudinary
                const result = await cloudinary.uploader.upload(req.files[0].path, {
                    folder: "roomImage"
                })
                console.log(result)

                // update new image 
                updateImage.public_id = result.public_id;
                updateImage.secure_url = result.secure_url;

            }

        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
        }

        await room.save()

        res.status(200).json({
            success: true,
            message: "room image update successful",
            room
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }

}

export const roomDetailUpdate = async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
        return next(new ErrorHandler("room not found", 400))
    }
    try {

        const room = await Room.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidation: true
        });

        console.log(room)

        res.status(200).json({
            success: true,
            message: "room detail updated sucessfully",
            room
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }




}

export const roomImageRemove = async (req, res, next) => {
    const id = req.params.id
    const imageId = req.params.imageid


    if (!id) {
        return next(new ErrorHandler("please enter id  ", 400))
    }
    if (!imageId) {
        return next(new ErrorHandler("imageId does not exist ", 400))
    }

    try {
        const room = await Room.findByIdAndUpdate(id, {
            $pull: {
                roomImage: { _id: imageId }
            }
        }, {
            new: true,
            runValidation: true
        })

        if (!room) {
            return next(new ErrorHandler("room not have ", 400))
        }

        res.status(200).json({
            success: true,
            message: "room image remove successful",
            room
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }

}

export const addRoomImage = async (req, res, next) => {
    const id = req.params.id

    try {

        const room = await Room.findById(id)

        console.log(req.files)

        try {
            if (req.files) {
                for (let i = 0; i < req.files.length; i++) {
                    const result = await cloudinary.uploader.upload(req.files[i].path, {
                        folder: "roomImage"
                    })
                    room.roomImage.push({
                        public_id: result.public_id,
                        secure_url: result.secure_url
                    })
                    await fs.unlink(req.files[i].path)
                }
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
        }

        await room.save();

        res.status(200).json({
            success: true,
            message: "image upload sucessfully",
            room
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }



}

export const updateRoomAvailability = async (req, res) => {

    console.log("helo")
    try {
        const {
            oldBuilding,
            oldRoom,
            newBuilding,
            newRoom,
        } = req.body;

        console.log(req.body)

        // Purana room available kar do
        const oldRoomData = await Room.findOne({
            buildingName: oldBuilding,
            room: oldRoom,
        });

       

        if (oldRoomData) {
            oldRoomData.Avaliablity = true;
            await oldRoomData.save();
        }

       
        const newRoomData = await Room.findOne({
            buildingName: newBuilding,
            room: newRoom,
        });

        console.log("newRoomData>>>>",newRoomData)

        if (!newRoomData) {
            return res.status(404).json({
                success: false,
                message: "New room not found",
            });
        }

        newRoomData.Avaliablity = false;
        await newRoomData.save();

        return res.status(200).json({
            success: true,
            message: "Room availability updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



