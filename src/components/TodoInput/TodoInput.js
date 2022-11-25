import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';

const TodoInput = ({ addTodo }) => {
   const today = dayjs();
   const fileInputRef = useRef(null);

   const [inputValue, setInputValue] = useState('');
   const [description, setDescription] = useState('');
   const [date, setDate] = useState(`${today.$y}-${today.$M + 1}-${today.$D}`);
   const [file, setFile] = useState(null);

   const handleFileChange = (e) => {
      setFile(e.target.files[0]);
   };

   const handleDateValueChange = (e) => {
      setDate(e.target.value);
   };

   const handleInputValueChange = (e) => {
      setInputValue(e.target.value);
   }

   const handleDescriptionValueChange = (e) => {
      setDescription(e.target.value);
      const { name, value } = e.target

      if (name === "inputValue") {
         setInputValue(value)
      } else {
         setDescription(value)
      }
   }

   const hanldeEnterPress = (e) => {
      if (e.key === 'Enter') {
         handleAddTodo();
      }
   }

   const handleAddTodo = () => {
      if (inputValue) {
         addTodo({
            title: inputValue,
            id: Date.now(),
            complete: false,
            description: description,
            time: date,
            file: file
         });
         setInputValue('');
         setDescription('');
         fileInputRef.current.value = "";
      }
   }

   return (
      <div className='wrapper'>
         <form>
            <div>
               <p>Title</p>
               <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputValueChange}
                  onKeyDown={hanldeEnterPress}
                  placeholder="input your value"
                  className='inputStyle'
               />
            </div>
            <div>
               <p>Description</p>
               <textarea type="text"
                  value={description}
                  onChange={handleDescriptionValueChange}
                  className='wrapper_area'
               />
            </div>
            <div>
               <p>Date</p>
               <input type="date"
                  value={date}
                  onChange={handleDateValueChange}
                  className='inputStyle'
                  style={{ marginBottom: "20px" }}
               />
            </div>
            <div>
               <input
                  ref={fileInputRef}
                  className='attachment'
                  type="file"
                  onChange={handleFileChange}
               />
               <button type='button' onClick={handleAddTodo} className="btnAdd">Add</button>
            </div>
         </form>
      </div>
   );
}

export default TodoInput;