import { Schools } from "../../models/School";
import JsonResponse from "../../utils/Response";
import { Controller } from "../../types/controller";

export const editSchool: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const school_id = res.locals.admin.school_id;
        const data = req.body;
        await Schools.findOneAndUpdate({school_id}, {
            $set: data
        });
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.serverError()
    }
}