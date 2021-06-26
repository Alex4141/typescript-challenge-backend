import ClientObj from "../db/index";
import express from "express";
import { StaysSchema, CursorSchema } from "../utils/schema";
import { Db, Cursor, Collection } from "mongodb"

class StaysService {
    
    async post(requestObject : express.Request): Promise<Cursor> {
        const client : Db = await ClientObj;
        const col : Collection = client.collection("listingsAndReviews");

        const bodyObject : object = requestObject.body;
        const queryObject : object = requestObject.query;
        let searchCriteria = bodyObject;

        try {
            const results : object = await CursorSchema.validateAsync(queryObject, {stripUnknown : true});
            const { _id } : any = results;
            searchCriteria = {...bodyObject, _id : { $gt : _id.toString() }};
        } catch (err) {  }

        return await col.find(searchCriteria, { limit: 25 }).sort({ _id : 1});
    }

    async validateParameters(request : express.Request, response : express.Response, next: Function) : Promise<any> {        
        try {
            const bodyObject : object = request.body;
            const results : object = await StaysSchema.validateAsync(bodyObject, {stripUnknown : true});
            request.body = results;
            return next();
        } catch (err) {
            response.status(400);
            return response.json({ success : false, error : "Invalid Input" });
        }
    }    

}

export default StaysService;