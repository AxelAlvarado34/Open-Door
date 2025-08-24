import { Request, Response } from "express";
import Property from "../models/Property.model";
import { AuthRequest } from "../middleware/CheckAuth";
import cloudinary from "../config/cloudinary";

export class PropertyController {

    static getAllProperties = async (req: AuthRequest, res: Response) => {
        try {

            const properties = await Property.findAll();
            return res.status(200).json({ data: properties })

        } catch (error) {
            console.error("Error fetching properties:", error);
            res.status(500).json({ error: "Error fetching properties" });
        }
    }

    static getMyProperties = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user.id;

            const properties = await Property.findAll({
                where: { userId },
                order: [['createdAt', 'DESC']]
            })

            return res.json({ data: properties })

        } catch (error) {
            console.error("Error fetching properties:", error);
            res.status(500).json({ error: "Error fetching your properties" });
        }
    }

    static createProperty = async (req: AuthRequest, res: Response) => {
        try {
            const imageUrl = req.file ? (req.file as any).path : null;
            const property = await Property.create({
                ...req.body,
                price: Number(req.body.price),
                bedroom: Number(req.body.bedroom),
                bathroom: Number(req.body.bathroom),
                parking: Number(req.body.parking),
                userId: req.user.id,
                image: imageUrl,
            });

            res.json({ data: property });
        } catch (error) {
            console.error("Error creating property:", error);
            res.status(400).json({
                error: error.message || 'Error creating property',
                details: error.errors || null
            });
        }
    }

    static deleteProperty = async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;

            const property = await Property.findByPk(id);
            if (!property) {
                return res.status(404).json({ msg: "Property not found" });
            }

            if (property.userId !== req.user.id) {
                return res.status(403).json({ msg: "You are not authorized to delete this property" });
            }

            await property.destroy();
            return res.json({ message: "Property deleted successfully" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Server error" });
        }
    }
    static editProperty = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      const property = await Property.findByPk(id);
      if (!property) return res.status(404).json({ msg: "Property not found" });

      if (property.userId !== req.user.id) return res.status(403).json({ msg: "Unauthorized" });

      const updateData = { ...req.body };
      if (req.file) {
        const upload = await cloudinary.uploader.upload(req.file.path, { folder: "properties" });
        updateData.image = upload.secure_url;
      }

      await property.update(updateData);

      return res.json({ msg: "Property updated successfully", property });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  };
}
