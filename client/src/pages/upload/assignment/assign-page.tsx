import { ClassSchema } from "@shared/School";
import { getClasses } from "api/schools";
import MobileSearchHeader from "components/header/mobile-search-header";
import { toastError } from "components/Toast/toast";
import StackContainer from "container/mobile-layouts/stack-container";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "types/states";
import DoneIcon from '@mui/icons-material/Done';
import { UploadAssignmentActions } from "redux/UploadAssignment/uploadAssignmentActions";
export default function AssignPage(){
    const [classes, setClasses] = useState<ClassSchema[]>([]);
    const [tempClass, setTempClass] = useState<ClassSchema[]>([])
    const school_id = useSelector((state: RootState)=>state.currentUser?.school_id) as string;
    const selectedClasses = useSelector((state: RootState)=>state.uploadAssignmentData.assigned_to)
    const fetchClass = async() => {
        const res = await getClasses(school_id);
        if(res.error) return toastError(res.message);
        setClasses(res.data);
        setTempClass(res.data)
    }
    const search = (text: string) => {
        if(!text) return setClasses(tempClass)
        const filtered = tempClass.filter(x=>{
            const name =  `class ${x.grade} ${x.section.toLowerCase()}`
            return name.includes(text.toLowerCase());
        })
        setClasses(filtered)
    }
    useEffect(()=>{
        fetchClass()
    }, [])
    return(
        <>
            <MobileSearchHeader buttonLabel="Done" goBack onChange={search} />
            <StackContainer className="assign-items-container">
                {classes.map((x, i)=><ClassItem data = {x} key = {i} />)}
            </StackContainer>
        </>
    )
}

interface ItemProps {
    data: ClassSchema,
}
function ClassItem({data}: ItemProps){
    const selectedClasses = useSelector((state: RootState)=>state.uploadAssignmentData.assigned_to)
    const isActive = selectedClasses.find(x=>x.class_id === data.class_id) ? true : false
    const dispatch = useDispatch()
    const handleClick = () => {
        if(isActive) dispatch(UploadAssignmentActions.removeClass(data.class_id));
        else dispatch(UploadAssignmentActions.addClass(data));
    }
    let RadioButton: JSX.Element;
    if(isActive){
        RadioButton = (
            <div className = "assign-class-item-radio active">
                <DoneIcon />
            </div>
        )
    }else {
        RadioButton =  <div className = "assign-class-item-radio acive"></div>
    }
    return(
        <div className="assign-class-item" onClick={handleClick}>
            <div className = "assign-class-item-name">{`Class ${data.grade} ${data.section}`}</div>
            {RadioButton}
        </div>
    )
}