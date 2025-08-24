import { Request, Response } from "express";
import Property from "../models/Property.model";
import { AuthRequest } from "../middleware/CheckAuth";

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

    static deleteProperty = async(req: AuthRequest, res: Response) => {
        
    }
}
