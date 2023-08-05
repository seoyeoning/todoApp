// 클래스형 컴포넌트
import React, { useState, useCallback } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";

const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

export default function App() {
  console.log("App Component");
  // export default class App extends Component 클래스 컴포넌트일 때

  // state = {
  //   todoData: [],
  //   value: "",
  // }; 클래스 컴포넌트

  // 함수형
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  // 할 일 입력 후 목록에 추가하고 쓴거 지워주기
  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지가 리로드 되는 걸 막아줌
    e.preventDefault();
    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    // 원래 있던 할 일에 새로운 할 일 더해주기
    // this.setState({ todoData: [...todoData, newTodo], value: "" }); 클래스
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
    setValue("");
  };

  // 할 일 목록 삭제할 때
  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      //console.log('newTodoData', newTodoData)
      // this.setState({ todoData: newTodoData }); 클래스 컴포넌트
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    },
    [todoData]
  );

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  // 함수형은 render 없이 바로 return
  return (
    <div className="flex items-start justify-center w-screen h-screen bg-pink-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>Todo List</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>

        {/* props로 내려줌 (자식 컴포넌트에) */}
        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          handleClick={handleClick}
        />

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
