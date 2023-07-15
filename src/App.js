// 클래스형 컴포넌트
import React, { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

export default function App() {
  // export default class App extends Component 클래스 컴포넌트일 때

  // state = {
  //   todoData: [],
  //   value: "",
  // }; 클래스 컴포넌트

  // 함수형
  const [todoData, setTodoData] = useState([]);
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
    setValue("");
  };

  // 함수형은 render 없이 바로 return
  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <h1 className="text-3xl font-bold underline">Hello world!</h1>

        {/* props로 내려줌 (자식 컴포넌 트에) */}
        <List todoData={todoData} setTodoData={setTodoData} />

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
