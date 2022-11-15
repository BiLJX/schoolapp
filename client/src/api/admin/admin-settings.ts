import { School } from "@shared/School";
import axios from "../instance";

export const editSchool = async (data: School) => {
    const res = await axios.patch("/api/admin/settings/edit/school", data);
    return res.data as ApiResponse;
}