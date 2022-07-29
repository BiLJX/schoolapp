import { ClientInteractionData } from "@shared/StudentInteraction";
import { Teacher } from "@shared/User";
import NotificationHandler from "../handler/notificationHandler";
import { Interactions } from "../models/Interaction";
import { Students } from "../models/Student";
import { Controller } from "../types/controller";
import JsonResponse from "../utils/Response";

export const giveInteraction: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    const currentUser = res.locals.user as Teacher;
    const notification: NotificationHandler = req.app.locals.notification;
    try {
        const clientData: ClientInteractionData = req.body;
        if(!clientData.reason) return jsonResponse.clientError("Please provide a reason!");
        clientData.reason = clientData.reason.trim()
        if(clientData.reason.length < 3) return jsonResponse.clientError("Reason should be more than 3 charecters.")
        const student = await Students.findOne({user_id: clientData.given_to, school_id: currentUser.school_id});
        if(!student) return jsonResponse.clientError("Student not found");
        const interaction = new Interactions({
            ...clientData,
            given_by: currentUser.user_id
        })
        await interaction.save();
        jsonResponse.success(null, `gave ${interaction.amount} ${interaction.type} to ${student.full_name}`);
        //background
        try {
            await notification.sendInteraction({
                sender_id: currentUser.user_id,
                receiver_id: clientData.given_to,
                title: `gave you ${interaction.type}`,
            }) 
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}