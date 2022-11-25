import Todo from "../Todo/Todo";

const TodoList = ({ todoList, removeTodo, handleToggle, saveTodo }) => {
   return (
      <div>
         <ul>
            {
               todoList.map((todo) =>
                  <Todo
                     todo={todo}
                     removeTodo={removeTodo}
                     handleToggle={handleToggle}
                     saveTodo={saveTodo}
                     key={todo.id}
                  />
               )
            }
         </ul>
      </div>
   )
}

export default TodoList;