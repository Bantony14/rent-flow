import cloudinary from "../config/cloudinary.connect.js"
import Room from "../models/room.model.js"
import fs from "fs/promises"
import ErrorHandler from "../utils/error.js"

export const roomCreate = async (req, res, next) => {
    console.log("hello")
    try {
        const room = await Room.create(req.body)

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
            console.log("error in image upload")
            return next(new ErrorHandler(error.message, 500))
        }

        await room.save();
        res.status(200).json({
            success: true,
            message: "room created successfully",
            room
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

