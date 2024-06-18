import {  collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore"

import { db } from "../DB/FireBase";

import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkOutline } from "react-icons/io5";

export default function TaskList(props){

    const ref = collection(db,'tasks')

    async function completedTask(taskId){

        const q = query(ref,where('taskId','==',taskId))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc)=>{
            updateDoc(doc.ref,{completed:true})
        })
    }

    async function deleteTask(taskId){
        const q = query(ref,where('taskId','==',taskId))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc)=>{
            deleteDoc(doc.ref)
        })
    }

    const status = props.completed?'completed':
                    (new Date().getTime() / 1000>props.deadline)?'overdue':'on track'

    const instyle={backgroundColor:status==='completed'?'#6FCA73':status==='on track'?'#EADE78':'#F86767'}

    

    const deadline = new Date(props.deadline * 1000);
    const deadlineHour = deadline.toString().split('GMT')[0]

    return(
        <>
        <div className="task-items">
            <h1 className="task-title">{props.taskName}</h1>
            <div >
             <h5 style={instyle} className="task-status">{status}</h5>
            </div>
            <p className="task-deadline">{deadlineHour}</p>
            <div>
        <div className="task-action">
            <div className="task-complete"onClick={()=>completedTask(props.taskId)}>
                <IoCheckmarkOutline  size={20} color="#259B2A"/>
                </div>
            <div className="task-delete"
            onClick={()=>deleteTask(props.taskId)}>
                <RxCross2 size={20} color="#F86767"/>
                </div>
            </div>
            </div>
            <hr/>
        </div>
        </>
    )

} 