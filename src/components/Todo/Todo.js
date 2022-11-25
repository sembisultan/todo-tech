import './Todo.css';
import { useState } from 'react';
import dayjs from 'dayjs';

const styles = {
   li: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '.5rem 1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '.5rem'
   },
   input: {
      marginRight: '1rem',
      listStyleType: 'none'
   }
}

const Todo = ({ todo, removeTodo, handleToggle, saveTodo }) => {
   const [isEdit, setIsEdit] = useState(false);
   const [newTitle, setNewTitle] = useState(todo.title);
   const [newDescription, setNewDescription] = useState(todo.description);
   const [newDate, setNewDate] = useState(todo.time);
   const [newFile, setNewFile] = useState(null);

   const handleRemove = () => {
      removeTodo(todo);
   }

   const handleSave = () => {
      const modifiedTodo = todo;
      modifiedTodo.title = newTitle;
      modifiedTodo.description = newDescription;
      modifiedTodo.time = newDate;
      modifiedTodo.file = newFile;
      saveTodo(todo.id, modifiedTodo);
      setIsEdit(false);
   }

   const isDone = () => {
      const today = dayjs();
      const parsedDate = `${today.$y}-${today.$M + 1}-${today.$D}`;
      if (todo.completed === true) return true;
      if (parsedDate === todo.time && parsedDate === newDate) return true;
   }

   return (
      <li className='list' style={styles.li}>
         <div className="Todo">
            <div className={isDone() ? "done" : "Nodone"}>
               {isEdit ? (
                  <input
                     value={newTitle}
                     onChange={(e) => {
                        setNewTitle(e.target.value);
                     }}
                  />
               ) : (
                  <h2>
                     {todo.title}
                  </h2>
               )}
               {isEdit ? (
                  <div>
                     <textarea
                        className='Todo_textarea'
                        value={newDescription}
                        onChange={(e) => {
                           setNewDescription(e.target.value);
                        }}
                     />
                  </div>
               ) : (
                  <div>
                     {todo.description}
                  </div>
               )}
                {isEdit ? (
                  <div>
                     <input
                        type="date"
                        value={newDate}
                        onChange={(e) => {
                           setNewDate(e.target.value);
                        }}
                     />
                  </div>
               ) : (
                  <div>
                     {todo.time}
                  </div>
               )}
               {isEdit ? (
                  <div>
                     <input
                        type="file"
                        onChange={(e) => setNewFile(e.target.files[0])}
                     />
                  </div>
               ) : (
                  <div>
                     {todo?.file?.name}
                  </div>
               )}
            </div>
            <div>
               { 
                  !isEdit && 
                  <button type="button" onClick={() => handleToggle(todo.id)} className="Todo_button">
                     done
                  </button>
               }
               {isEdit ? (
                  <button 
                     type="button"
                     onClick={handleSave}
                     className="Todo_button"
                  >
                     Save
                  </button>
               ) : (
                  <button
                     type="button"
                     className="Todo_button"
                     onClick={() => setIsEdit(true)}
                  >
                     edit
                  </button>
               )}
               {
                  !isEdit &&
                  <button type="button" onClick={handleRemove} className="Todo_button">
                     x
                  </button>
               }
            </div>
         </div>
      </li >
   );
};

export default Todo;