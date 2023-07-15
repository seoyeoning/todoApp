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
      <form m onSubmit={handleSubmit} className="flex pt-2">
        <input
          type="text"
          name="value"
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
          placeholder="해야 할 일을 입력하세요."
          value={value}
          onChange={handleChange}
        />
        <input
          className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
          type="submit"
          value="입력"
        />
      </form>
    </div>
  );
}
