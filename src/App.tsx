import { useState } from "react";

const OTP_DIGITS_COUNT = 6;
const defaultArray = new Array<string>(OTP_DIGITS_COUNT).fill("");

function App() {
  const [inputArr, setInputArr] = useState<string[]>(defaultArray);

  const handleOnChange = (value: string, index: number) => {
    try {
      console.log({ value });
      const trimmedValue = value.trim();

      if (trimmedValue.length === 0) {
        return;
      }

      const lastChar = trimmedValue.slice(-1);

      if (isNaN(Number.parseInt(lastChar))) {
        return;
      }

      const newInputArr = [...inputArr];
      newInputArr[index] = lastChar;
      setInputArr(newInputArr);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    const key = e.key;

    if (key !== "Backspace") {
      return;
    }
  };

  return (
    <div className="app">
      <h1>OTP Input</h1>
      <div className="otp-container">
        {inputArr.map((input, index) => {
          return (
            <input
              key={index}
              className="otp-input"
              type="text"
              name="otp"
              id="otp"
              value={input}
              onChange={(e) => handleOnChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyPress(e, index)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
