/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useState } from "react";

import { db } from "../DB/FireBase";
import { collection,query,where, onSnapshot, orderBy} from "firebase/firestore";


import TaskList from "./TaskList";
import AddTask from "./AddTask";

import { PiChecks   } from "react-icons/pi";
import { MdLogout } from "react-icons/md";


export default function HomePage(props){

    const [taskData,setTaskData] = useState([])


    useEffect(() => async function fetchData(){
      const q = query(collection(db,'tasks'),where('userId','==',props.userId),orderBy('deadline'))
      onSnapshot(q,(querySnapshot)=>{
        const data = []
        querySnapshot.forEach(doc=>data.push(doc.data()))
        setTaskData(data)
      })

    }, [props.userId]);


    

    
    

    const taskElements = taskData.map((item,index)=>{

        return <TaskList 
                key={index}
                completed = {item.completed}
                taskName = {item.task}
                taskId = {item.taskId}
                userId = {item.userId}
                deadline = {item.deadline.seconds}
        />
    })

    

     return (
        <div>
          <nav className="NavBar">
            <div className="logo-title">
              <PiChecks  size={40} className="logo"/>
              <p className="title">PRODUCTIZE</p>
            </div>
            <div onClick = {props.Logout} className="logout-button-items">
                <MdLogout size={20} color="#8D9198"/>
                <p>Logout</p>
            </div>
          </nav>
            {<AddTask userId = {props.userId}/>}
            <div className="task-header">
                <h5>Tasks</h5>
                <h5>Status</h5>
                <h5>Deadline</h5>
                <h5>Action</h5>
            </div>
            <hr/>
            <div>{taskElements}</div>
        </div>  
     )
}


