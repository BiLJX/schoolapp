import { getAssignedStudents, redoAssignment, submitAssignment } from "api/assignment";
import Avatar from "components/Avatar/avatar";
import MobileSearchHeader from "components/header/mobile-search-header";
import { toastError } from "components/Toast/toast";
import StackContainer from "container/mobile-layouts/stack-container";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReplayIcon from '@mui/icons-material/Replay';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import "./change-status.scss"
import ReactModal from "react-modal";
import { ShortTextOutlined } from "@material-ui/icons";
import ReactTextareaAutosize from "react-textarea-autosize";

interface ItemData {
    full_name: string, 
    user_id: string, 
    profile_picture_url: string,
    has_to_redo: boolean
}
export default function ChangeStatusAssignment(){
    const { id } = useParams()
    const [students, setStudents] = useState<ItemData[]>([]);
    const [temp, setTemp] = useState<ItemData[]>([]);
    const fetchStudents = async() => {
        if(!id) return;
        const res = await getAssignedStudents(id);
        if(res.error){
            return toastError("Error while fetching students");
        }
        setStudents(res.data);
        setTemp(res.data);
    }
    const onSearch = (text: string) => {
        if(!text) return setStudents(temp);
        setStudents(temp.filter(x=>x.full_name.toLowerCase().includes(text.toLocaleLowerCase())));
    }
    useEffect(()=>{
        fetchStudents();
    }, [])
    return(
        <>
            <MobileSearchHeader buttonLabel="Done" goBack onChange={onSearch} />
            <StackContainer style={{ paddingTop: "1rem" }}>
                {
                    students.map((x, i)=><Item data = {x} key = {i} />)
                }
            </StackContainer>
        </>
    )
}



function Item({data}:{data: ItemData}){
    const [isRemoved, setIsRemoved] = useState(false)
    const [has_to_redo, setHas_to_redo] = useState(data.has_to_redo);
    const [modalState, setModalState] = useState<{state: boolean, type: "Redo"|"Complete"}>({
        state: false,
        type: "Complete"
    })
    if(isRemoved) return <></>
    return(
        <>
            <Modal 
            isOpen = {modalState.state} 
            onClose = {()=>setModalState({...modalState, state: false})} 
            type = {modalState.type}
            student_id = {data.user_id}
            onRemoveItem = {()=>setIsRemoved(true)}
            onHasToRedo = {()=>setHas_to_redo(true)}
            />

            <div className ="assignment-assigned-student-item">
                <Avatar to = {"/student/"+data.user_id} src = {data.profile_picture_url} size = {35} />
                <span className="ellipsis">{data.full_name}</span>
                <button disabled = {has_to_redo} className = "redo-button" onClick = {()=>!has_to_redo && setModalState({state: true, type: "Redo"})}>
                    <ReplayIcon />
                </button>
                <button className = "complete-button" onClick = {()=>setModalState({state: true, type: "Complete"})}>
                    <DoneAllIcon />
                </button>
            </div>
        </>
    )
}
interface ModalProps {
    isOpen: boolean, 
    onClose: ()=>any,
    student_id: string
    type: "Redo"|"Complete"
    onRemoveItem: ()=>void,
    onHasToRedo: ()=>void
}
    

function Modal({
    isOpen, 
    type, 
    onClose,
    student_id,
    onRemoveItem,
    onHasToRedo
}: ModalProps){
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const id = useParams().id as string;
    const onRedo = async() => {
        if(loading) return;
        setLoading(true);
        const res = await redoAssignment(id, student_id);
        if(res.error){
            toastError(res.message);
            return setLoading(false);
        }
        setLoading(false);
        onHasToRedo();
        onClose();
    }
    const onComplete = async() => {
        if(loading) return;
        setLoading(true);
        const res = await submitAssignment(id, student_id);
        if(res.error){
            toastError(res.message);
            return setLoading(false);
        }
        setLoading(false);
        onRemoveItem();
        onClose();
    }
    return(
        <ReactModal overlayClassName="modal-overlay" className = "change-status-modal" isOpen = {isOpen}>
            <div className = "change-status-modal-remarks">
                {/* <div className = "reason-icon">
                    <ShortTextOutlined />
                </div>
                <ReactTextareaAutosize onChange = {(e)=>setReason(e.target.value)} minRows={10} className = "reason-input" placeholder={"(optional) Remarks for "+type} /> */}
            </div>
            <div className = "change-status-modal-buttons">
                <button className = "change-status-button" onClick={type === "Complete"?onComplete:onRedo}>{loading?"Loading...":type}</button>
                <button className = "change-status-button cancel" onClick = {onClose}>Cancel</button>
            </div>
        </ReactModal>
    )
}