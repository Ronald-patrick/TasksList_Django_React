import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [list, setList] = useState([]);
  const [inp,setInp] = useState("");
  const [editing,setEditing]=useState(null);

  const handleData=(e)=>{
    setInp(e.target.value);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data={
      "title" : inp,
      "completed"  : false
    }
    setInp("");
    if(editing!==null)
    {
      await axios.post(`http://127.0.0.1:8000/api/task-create/${editing}/`,data);
      setEditing(null);
    }
    else
    {
      await axios.post('http://127.0.0.1:8000/api/task-create/',data);
    }
    const newlist=await axios.get('http://localhost:8000/api/task-list/');
    setList(newlist.data);
    console.log(newlist.data);
  }

  const deleteTask= async (e)=>{
    const id=Number(e.target.id);
    axios.delete(`http://127.0.0.1:8000/api/task-delete/${e.target.id}/`);
    setList(list.filter((lis)=>lis.id!==id));
    
  }

  const editTask = (task)=>{
    setInp(task.title);
    setEditing(task.id);
    console.log(task.id);
  }

  const strike = (task)=>{
    (task.completed)?task.completed=false:task.completed=true;
    axios.post(`http://127.0.0.1:8000/api/task-create/${task.id}/`,task);
    setList([...list]);
  }
  useEffect(() => {
    async function getDataApi()
    {
      
      const res = await axios.get("http://localhost:8000/api/task-list/");
      setList(res.data);
      
      return res;
    }
    getDataApi();
  },[]);

  useEffect(() => {
    
   },[list])

  return (
    <div className="container">
      <div id="task-container">
        <div id="form-wrapper">
          <form id="form">
            <div className="flex-wrapper">
              <div style={{ flex: 6 }}>
                <input
                  autoComplete="off"
                  className="form-control"
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Add task.."
                  onChange={handleData}
                  value={inp}
                />
              </div>

              <div style={{ flex: 1 }}>
                <input
                  id="submit"
                  className="btn btn-warning"
                  type="submit"
                  name="Add"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>

        <div id="list-wrapper">
          {list &&
            list.map((task, index) => {
              return (
                <div onClick={() =>strike(task)} key={index} className="task-wrapper flex-wrapper">
                  <div style={{ flex: 7 }}>
                    {
                      (task.completed)? 
                      <span>
                      <strike> {task.title}</strike>
                    </span>
                      :<span>
                      
                       {task.title}
                    </span>
                        
                    }
                    
                  </div>

                  <div style={{ flex: 1 }}>
                    <button onClick={() =>editTask(task)} className="btn btn-outline-info">Edit</button>
                  </div>
                  <div style={{ flex: 1 }}>
                  <button onClick={deleteTask} id={task.id} className="btn btn-outline-danger">Delete</button>
                  </div>  
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
