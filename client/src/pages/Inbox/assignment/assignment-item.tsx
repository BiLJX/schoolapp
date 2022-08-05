import "./item.scss";

export default function AssignmentItem(){
    let Status: JSX.Element;
    Status = <div className = "assignment-item-status completed">Completed</div>
    return(
        <div className="assignment-item">
            <div className = "assignment-item-top">
                <span>Science (Bio)</span>
                {Status}
            </div>
            <div className = "assignment-item-description">page no. 23 and also do all notes with all stuffs and everything...</div>
            <div className = "assignment-item-due">To submit: July 30, 2022</div>
        </div>
    )
}