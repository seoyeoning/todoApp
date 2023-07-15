// 할 일 목록 나타나는 리스트 컴포넌트로 분리
// rcf : 함수형 컴포넌트
// rce : 클래스형 컴포넌트

import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
                    <div
                      key={data.id}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      className={`${
                        snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
                      } flex items-center justify-between h-full px-4 py-1 my-2 text-gray-600 border rounded`}
                    >
                      <div className="items-center">
                        <input
                          type="checkbox"
                          defaultChecked={data.completed}
                          onChange={() => handleCompleChange(data.id)}
                        />{" "}
                        <span
                          className={
                            data.completed ? "line-through" : undefined
                          }
                        >
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
}
