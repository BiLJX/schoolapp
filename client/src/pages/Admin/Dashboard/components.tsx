import { DashboardData } from "@shared/School";
import AdminCardContainer from "container/Admin-Cards/admin-card";
import { Pie } from "react-chartjs-2";
import "./components.scss";

export function TotalCard({label, value}:{label: string, value: string}){
    return(
        <AdminCardContainer className="admin-total-card">
            <span className="label">{label}</span>
            <span className="value">{value}</span>
        </AdminCardContainer>
    )
}


export function ComparisionCard({data}: {data: DashboardData}){
    return(
        <AdminCardContainer className="admin-gender-comparision-card">
            <header>
                <h1>Gender Comparision</h1>
            </header>
            <div className = "pi-chart-container">
                <Pie
                width="200px"
                height="200px"
                data={{
                    labels: ["Male", "Female"],
                    datasets: [
                        {
                            data: [data.gender_stats.male_students, data.gender_stats.female_students],
                            backgroundColor: ["#004F94", "#FF7ACA"]
                        },
                        
                    ]
                }}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false

                        },
                    }
                }}
                />
            </div>
            <div className = "stats-heading center">
                <span>STATS</span>
            </div>
            <div className = "stats-item">
                <span>Total Students: {data.total_students}</span>
            </div>
            <div className = "stats-item">
                <div className = "color-box" style={{backgroundColor: "#004F94"}}/>
                <span>Total Male: {data.gender_stats.male_students}</span>
            </div>
            <div className = "stats-item">
                <div className = "color-box" style={{backgroundColor: "#FF7ACA"}}/>
                <span>Total Female: {data.gender_stats.female_students}</span>
            </div>
        </AdminCardContainer>
    )
}