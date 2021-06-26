import ClientObj from "../db/index";
import express from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { CursorSchema } from "../utils/schema";
import { Db, Cursor, Collection } from "mongodb"

class ReviewsService {
    async get(requestObject : express.Request) : Promise<Cursor>{
        const client : Db = await ClientObj;
        const col : Collection = client.collection("listingsAndReviews");

        const parameterObject : ParamsDictionary = requestObject.params;
        const { _id } : any = parameterObject;
        return await col.find({ _id : _id.toString() }).project({ "reviews" : 1, _id : 0});
    }

    async validateParameters(request : express.Request, response : express.Response, next: Function) : Promise<any> {
        try {
            const parameterObject : ParamsDictionary = request.params;
            const results : ParamsDictionary = await CursorSchema.validateAsync(parameterObject, {stripUnknown : true});
            request.params = results;
            return next();
        } catch (err) {
            response.status(400);
            return response.json({ success : false, error : "Invalid Input" });
        }
    }
}

export default ReviewsService;