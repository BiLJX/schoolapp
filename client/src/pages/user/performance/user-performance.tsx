import { StudentPerformanceData, TimePeriods } from "@shared/Student-Performance";
import { Line, Bar } from "react-chartjs-2";
import { getStudentPerformanceDemerit, getStudentPerformanceMerit, getStudentPerormanceMDOverall } from "api/user";
import { toastError } from "components/Toast/toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./user-performance.scss"
import "chart.js/auto"
export default function UserPerformance(){
    return(
        <div className = "user-performance">
            <MDOverall />
            <LineGraph fetchFunction={getStudentPerformanceMerit} color = "#4083ff" />
            <LineGraph fetchFunction={getStudentPerformanceDemerit} color = "#EB4747" />
        </div>
    )
}

function MDOverall(){
    const [data, setData] = useState<{ratio: number, difference: number}>();
    const { user_id } = useParams();
    useEffect(()=>{
        if(!user_id) return;
        getStudentPerormanceMDOverall(user_id)
        .then(res=>setData(res.data));
    }, [])
    if(!data) return <></>
    return(
        <div className="performance-item">
            <div className = "performance-header">
                <span>Merits and demerits overall</span>
            </div>
            <div className = "performance-list-items-container">
                <div className="performance-list-item">
                    <span className="performance-list-label">Merits to demerits ratio</span>
                    <span className="performance-list-value">{data.ratio}</span>
                </div>
                <div className="performance-list-item" style={{margin: "0"}}>
                    <span className="performance-list-label">Point difference</span>
                    <span className="performance-list-value">{data.difference}</span>
                </div>
            </div>
        </div>
    )
}
interface LineGraphProps {
    color: string;
    fetchFunction: (user_id: string, time_period: TimePeriods) => Promise<ApiResponse<StudentPerformanceData>>
}
function LineGraph({color, fetchFunction}: LineGraphProps){
    const [data, setData] = useState<StudentPerformanceData>();
    const { user_id } = useParams();
    const [period, setPeriod] = useState<TimePeriods>("MONTH")
    const getData = async() => {
        if(!user_id) return;
        const res = await fetchFunction(user_id, period);
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
                        borderWidth: 1,
                        backgroundColor: (context)=>{
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 150);
                            gradient.addColorStop(0, color+"4b");
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
                            // stepSize: 1,
                            precision: 0
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