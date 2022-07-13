import { AdminCancelButton, AdminSearchBarButton } from "components/Admin/buttons"
import { AdminInput } from "components/Admin/inputs"
import Modal from "react-modal"

interface props {
    isOpen: boolean,
    onClose: ()=>any
}
export default function AddClassModal(props: props){
    return(
        <Modal 
        isOpen = {props.isOpen}
        className = "modal"
        overlayClassName="modal-overlay admin-modal-overlay"
        shouldCloseOnOverlayClick = {true}
        onRequestClose = {props.onClose}
        >
            <form className="admin-form"> 
                <h2 style={{fontSize: "1.1rem", color: "var(--text-title)", marginBottom: "2rem"}}>Add class and section</h2>
                <div className="form-double-input-container">
                    <AdminInput placeholder="Class..." type="number" onChange={(text)=>{}} />
                    <AdminInput placeholder="Section..." type="number" onChange={(text)=>{}} />
                </div>
                <div style={{display: "flex"}}>
                    <AdminSearchBarButton label="Add class" className="form-add-button"/>
                    <AdminCancelButton onClick={props.onClose} className="form-add-button" />
                </div>

            </form>
        </Modal>
       
    )
}