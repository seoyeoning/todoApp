import React from "react";

export default function Form({ handleSubmit, value, setValue }) {
  // 할 일 입력 이벤트 value값 바꿔주기
  const handleChange = (e) => {
    console.log("e", e.target.value);
    // this.setState({ value: e.target.value }) 클래스
    setValue(e.target.value);
  };

  return (
    <div>
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
  );
}
