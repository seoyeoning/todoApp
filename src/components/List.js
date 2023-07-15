// 할 일 목록 나타나는 리스트 컴포넌트로 분리
// rcf : 함수형 컴포넌트
// rce : 클래스형 컴포넌트

import React from "react";

export default function List({ todoData, setTodoData }) {
  // x버튼 (함수형 만들 때 const 추가해주기)
  // const btnstyle = {
  //   color: "#fff",
  //   border: "none",
  //   padding: "5px 9px",
  //   borderRadius: "50%",
  //   cursor: "pointer",
  //   float: "right",
  // };

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

  // 할 일 목록 삭제할 때
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    //console.log('newTodoData', newTodoData)
    // this.setState({ todoData: newTodoData }); 클래스 컴포넌트
    setTodoData(newTodoData);
  };

  // getStyle 함수 (체크박스 누르면 줄 긋도록 동적으로 만들어야함)
  // const getStyle = (completed) => {
  //   return {
  //     padding: "10px",
  //     borderBottom: "1px #ccc dotted",
  //     textDecoration: completed ? "line-through" : "none",
  //   };
  // };

  return (
    <div>
      {todoData.map((data) => (
        <div key={data.id}>
          <div className="flex items-center justify-between h-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded ">
            <div className="items-center ">
              <input
                type="checkbox"
                defaultChecked={data.completed}
                onChange={() => handleCompleChange(data.id)}
              />{" "}
              <span className={data.completed ? "line-through" : undefined}>
                {data.title}{" "}
              </span>
            </div>
            <div className="items-center">
              <button
                className="px-4 py-2"
                onClick={() => handleClick(data.id)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
