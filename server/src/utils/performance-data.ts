import { TimePeriods } from "@shared/Student-Performance";

export const getDateByPeriod = (time_period: TimePeriods) => {
    try {
        const dateData = new Date();
        switch(time_period){
            case "WEEK":
                dateData.setDate(dateData.getDate()-7);
                return dateData;
            case "MONTH":
                dateData.setMonth(dateData.getDate());
                
        }
    } catch (error) {
        
    }
}