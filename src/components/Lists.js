// 할 일 목록 나타나는 리스트 컴포넌트로 분리
// rcf(export 포함) = rfc : 함수형 컴포넌트 , rfce(export 따로), rafce (화살표 함수 형식)
// rce : 클래스형 컴포넌트

// rcf, rfce, rafce

import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
  console.log("Lists Component");
  // x버튼 (함수형 만들 때 const 추가해주기)
  // const btnstyle = {
  //   color: "#fff",
  //   border: "none",
  //   padding: "5px 9px",
  //   borderRadius: "50%",
  //   cursor: "pointer",
  //   float: "right",
  // };

  // getStyle 함수 (체크박스 누르면 줄 긋도록 동적으로 만들어야함)
  // const getStyle = (completed) => {
  //   return {
  //     padding: "10px",
  //     borderBottom: "1px #ccc dotted",
  //     textDecoration: completed ? "line-through" : "none",
  //   };
  // };

  const handleEnd = (result) => {
    // result에는 source, destination 등 여러 정보가 포함됨
    console.log("result", result);

    // 목적지가 없으면 return(이벤트 취소)
    if (!result.destination) return;

    // 불변성을 위해 원래 데이터 담아줌
    const newTodoData = todoData;

    // 1. 변경시키는 아이템을 배열에서 지워주기 result.source.index(원래 인덱스), 1(몇개 없애줄건지)
    // 2. return 값으로 지워진 아이템을 잡아주기

    const [reorderItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 추가 result.destination.index(목적지 인덱스),0,reorderItem
    newTodoData.splice(result.destination.index, 0, reorderItem);
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="anything">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists;
