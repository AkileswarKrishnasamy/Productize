import { useState } from "react";

import {db,auth} from '../DB/FireBase'

import { addDoc,collection, serverTimestamp } from "firebase/firestore";

import {v4 as uuidv4} from 'uuid'

import { DatePicker } from 'rsuite';
import 'rsuite/DatePicker/styles/index.css';

export default function AddTask(props){
    const[taskData,setTaskData] = useState({taskName:'',deadline:''})


    async function addTask(e) {
      e.preventDefault()
      const deadline = taskData.deadline?taskData.deadline:new Date()
        try {
          await addDoc(collection(db, 'tasks'), {
            task: taskData.taskName,
            userId: props.userId,
            taskId: uuidv4(),
            completed: false,
            createdAt: serverTimestamp(),
            deadline:deadline
          });
          setTaskData({taskName:'',deadline:''}); 
        } catch (error) {
          console.error("Error adding task: ", error);
        }
      }
      function handleChange(e) {
        const { name, value } = e.target;
        setTaskData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      }

      function handleDateChange(e){
        setTaskData(prevState => ({
          ...prevState,
            deadline: e,
        }));
      }
    const date = new Date()
    return(
      <>
      <form onSubmit={(e)=>addTask(e)}>

        <div className="add-task">
          <div className="task-input-label">
            <label  className="task-label">Task:</label>
              <input  
                      className="task-input"
                      type = 'text'
                      name='taskName'
                      placeholder="   Add task"
                      value={taskData.taskName}
                      maxLength={20}
                      onChange={(e)=>handleChange(e)}
                      required={true}/>
              
          </div>
          <div className="deadline-input-label">
          <label className="deadline-label">Deadline:</label>
             <DatePicker onChange={(e)=>handleDateChange(e) 
              }format="MM/dd/yyyy HH:mm"  className="deadline-input" defaultValue={date}/>
          </div>
              <input  className="add-task-button" type="submit" value="Add Task"/>
        </div>
      </form>
        </>
    )
}