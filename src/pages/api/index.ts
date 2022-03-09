import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

let data: Todo[] = [];

const bodySchema = Joi.array()
    .items({
        id: Joi.number().required(),
        title: Joi.string().required(),
        completed: Joi.boolean().required(),
    })
    .required();

/**
 * TodoMVC API
 * ----------------
 * GET /api/ -> Returns all todos from this user (ip based)
 * PUT /api/ -> Persists and returns all todos from this user (ip based)
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "PUT") {
        const { error, value } = bodySchema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({ error: "BAD_REQUEST", details: error.details });
        }
        data = value;
    }

    res.json(data || []);
};
