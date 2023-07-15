import React from "react";

const List = React.memo(
  ({ id, title, completed, todoData, setTodoData, provided, snapshot }) => {
    console.log("List Component");

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

    return (
      <div
        key={id}
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
            defaultChecked={completed}
            onChange={() => handleCompleChange(id)}
          />{" "}
          <span className={completed ? "line-through" : undefined}>
            {title}{" "}
          </span>
        </div>
        <div className="items-center">
          <button className="px-4 py-2" onClick={() => handleClick(id)}>
            X
          </button>
        </div>
      </div>
    );
  }
);

export default List;
