import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState(""); // manages the input of new todo
  const [todos, setTodos] = useState([]); // stores all todo in an array
  const [showFinished, setshowFinished] = useState(true); // toggles visibility

  // useEffect hook to get todos from localstorage to app
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []); // [] means it will trigger everytime the web stats

  // function to save the todo to local storage
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }; 

  // function to toggles the visibility of todo
  const toggleFinished = (e) => {
    setshowFinished(!showFinished); // True->False and vice-versa
  };

  // function to edit an existing todo
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  // function to delete todo
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  // function to add new todo
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]); // 1. add new todo with a unique id and marks it as not completed
    setTodo(""); // this clears the input field 
    saveToLS(); // calls the function to save the todo in local storage
  };

  // function to write on the input type
  const handleChange = (e) => {
    setTodo(e.target.value); // this is sort of a rule
  };

  // function to check the toggle status
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  // JSX
  return (
    <>
      <Navbar /> {/* NavBar component */}

      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">

        <h1 className="font-bold text-center text-3xl">
          iTask - Manage your todos at one place
        </h1>

        <div className="addTodo my-5 flex flex-col gap-4">

          <h2 className="text-2xl font-bold">Add a Todo</h2>

          <div className="flex">

            <input
              onChange={handleChange} // this to make changes or write on the input box
              value={todo} // the function and this is used to handle input events
              type="text"
              className="w-full rounded-full px-5 py-1"
            />

            <button
              onClick={handleAdd} // this button triggers handleAdd function
              disabled={todo.length <= 3} // this makes sure that the length of todo should be more that 2 else the function wont work
              className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white"
            >
              Save
            </button>

          </div>
        </div>

        <input // checkbox
          className="my-4" 
          id="show" // id to link with label
          onChange={toggleFinished} // onChange calls toggleFinished function
          type="checkbox"
          checked={showFinished} // showFinished is true in useState and this makes checkbox true on deafult
        /> 

        <label className="mx-2" htmlFor="show"> 
          {/* using that htmlFor and the id of the checkbox, we can click the text and toggle the checkbox */}
          Show Finished
        </label>

        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div> {/* divider line */}

        <h2 className="text-2xl font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>} 
          {/* it checks the length of the array from todos.length and if the length is 0 i.e. if there is no todo then it displays the text "NO TODOS TO DISPLAY" */}
          
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className={"todo flex my-3 justify-between"}>
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;