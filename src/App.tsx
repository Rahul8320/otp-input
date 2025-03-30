import { useEffect, useRef, useState } from "react";

const OTP_DIGITS_COUNT = 6;
const defaultArray = new Array<string>(OTP_DIGITS_COUNT).fill("");

function App() {
  const [inputArr, setInputArr] = useState<string[]>(defaultArray);

  const refInputArr = useRef<any[]>([]);

  const handleOnChange = (value: string, index: number) => {
    try {
      if (isNaN(value as any)) {
        return;
      }

      const trimmedValue = value.trim();
      const lastChar = trimmedValue.slice(-1);

      const newInputArr = [...inputArr];
      newInputArr[index] = lastChar;
      setInputArr(newInputArr);

      if (lastChar.length > 0) {
        refInputArr.current[index + 1]?.focus();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnKeyDown = (e: any, index: number) => {
    const key = e.key;
    console.log({ index });

    if (key !== "Backspace") {
      return;
    }

    if (!e.target.value) {
      refInputArr.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    refInputArr.current[0]?.focus();
  }, []);

  return (
    <div className="app">
      <h1>Please input your OTP</h1>
      <div className="otp-container">
        {inputArr.map((_, index) => {
          return (
            <input
              key={index}
              className="otp-input"
              type="text"
              name="otp"
              id="otp"
              value={inputArr[index]}
              onChange={(e) => handleOnChange(e.target.value, index)}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              ref={(input: any) => (refInputArr.current[index] = input)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
