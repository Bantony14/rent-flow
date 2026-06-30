import cloudinary from "../config/cloudinary.connect.js"
import Room from "../models/room.model.js"
import fs from "fs/promises"
import ErrorHandler from "../utils/error.js"

export const roomAdd = async (req, res, next) => {
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