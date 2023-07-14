// 클래스형 컴포넌트
import React, { useState } from "react";
import "./App.css";

export default function App() {
  // export default class App extends Component 클래스 컴포넌트일 때

  // state = {
  //   todoData: [],
  //   value: "",
  // }; 클래스 컴포넌트

  // 함수형
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  // x버튼 (함수형 만들 때 const 추가해주기)
  const btnstyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  // getStyle 함수 (체크박스 누르면 줄 긋도록 동적으로 만들어야함)
  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  // 할 일 목록 삭제할 때
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    //console.log('newTodoData', newTodoData)
    // this.setState({ todoData: newTodoData }); 클래스 컴포넌트
    setTodoData(newTodoData);
  };

  // 할 일 입력 이벤트 value값 바꿔주기
  const handleChange = (e) => {
    console.log("e", e.target.value);
    // this.setState({ value: e.target.value }) 클래스
    setValue(e.target.value);
  };

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

  // checkbox 바꿔주는 함수
  const handleCompleChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });

    //this.setState({ todoData: newTodoData }); 클래스
    setTodoData(newTodoData);
  };

  // 함수형은 render 없이 바로 return
  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
        {todoData.map((data) => (
          <div style={getStyle(data.completed)} key={data.id}>
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={() => handleCompleChange(data.id)}
            />
            {data.title}
            <button style={btnstyle} onClick={() => handleClick(data.id)}>
              X
            </button>
          </div>
        ))}

        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
          <input
            type="text"
            name="value"
            style={{ flex: "10", padding: "5px" }}
            placeholder="해야 할 일을 입력하세요."
            value={value}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="입력"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    </div>
  );
}
