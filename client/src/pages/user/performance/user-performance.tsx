import { StudentPerformanceData, TimePeriods } from "@shared/Student-Performance";
import { Line } from "react-chartjs-2";
import { getStudentPerformanceDemerit, getStudentPerformanceMerit } from "api/user";
import { toastError } from "components/Toast/toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./user-performance.scss"
import "chart.js/auto"
export default function UserPerformance(){
    const { user_id } = useParams();
    const [merits, setMerits] = useState<StudentPerformanceData>();
    const [demerits, setDemerits] = useState<StudentPerformanceData>();
    const [period, setPeriod] = useState<TimePeriods>("WEEK")
    const getMerits = async () => {
        if(!user_id) return;
        const res = await getStudentPerformanceMerit(user_id, period);
        if(res.error) toastError(res.message);
        setMerits(res.data);
    }
    const getDemerts = async () => {
        if(!user_id) return;
        const res = await getStudentPerformanceDemerit(user_id, period);
        if(res.error) toastError(res.message);
        setDemerits(res.data);
    }
    useEffect(()=>{
        // getMerits();
        // getDemerts();
    }, [])
    return(
        <div className = "user-performance">
            <LineGraph fetchFunction={getStudentPerformanceMerit} color = "#4083ff" />
            <LineGraph fetchFunction={getStudentPerformanceDemerit} color = "#EB4747" />
        </div>
    )
}
interface LineGraphProps {
    color: string;
    fetchFunction: (user_id: string, time_period: TimePeriods) => Promise<ApiResponse<StudentPerformanceData>>
}
function LineGraph({color}: LineGraphProps){
    const [data, setData] = useState<StudentPerformanceData>();
    const { user_id } = useParams();
    const [period, setPeriod] = useState<TimePeriods>("MONTH")
    const getData = async() => {
        if(!user_id) return;
        const res = await getStudentPerformanceMerit(user_id, period);
        if(res.error) toastError(res.message);
        setData(res.data);
    };
    useEffect(()=>{
        getData()
    }, [period])
    if(!data) return <></>;
    return(
        <div className="performance-item">
            <div className = "performance-header">
                <span>{data.name}</span>
                <select onChange={(e)=>setPeriod(e.target.value as TimePeriods)}>
                    <option value = "MONTH">Current Month</option>
                    <option value = "WEEK">Current Week</option>
                    <option value = "YEAR">Current Year</option>
                </select>
            </div>
            <Line
            className="user-performance-line-graph" 
            data = {{
                labels: data.labels,
                datasets: [
                    {
                        data: data.data,
                        label: data.name,
                        borderColor: color,
                        pointRadius: 0,
                        backgroundColor: (context)=>{
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 180);
                            gradient.addColorStop(0, color+"5A");
                            gradient.addColorStop(1, "#FFFFFF00");
                            return gradient;
                        },
                        fill: true,
                        
                    }
                ]
            }} 
            options = {{
                plugins: {
                    legend: {
                        display: false
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                        },
                        grid: {
                            display: false
                        }
                    },
                }
            }}
            />
        </div>
    )
}