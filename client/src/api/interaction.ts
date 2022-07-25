import axios from "./instance";
import { ClientInteractionData } from "@shared/StudentInteraction";

export const giveInteraction = async (data: ClientInteractionData) => {
    const res = await axios.post("/api/interaction", data);
    return res.data as ApiResponse;
}
