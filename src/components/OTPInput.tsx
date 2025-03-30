import { useEffect, useRef, useState } from "react";

interface OTPInputProps {
  otp_length: number;
}

export const OTPInput = ({ otp_length }: OTPInputProps) => {
  const defaultArray = new Array<string>(otp_length).fill("");

  const [inputArr, setInputArr] = useState<string[]>(defaultArray);

  const refInputArr = useRef<any[]>([]);

  const handleOnChange = (value: string, index: number) => {
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
    <div className="otp-container">
      {inputArr.map((_, index) => {
        return (
          <input
            key={index}
            className="otp-input"
            type="text"
            value={inputArr[index]}
            onChange={(e) => handleOnChange(e.target.value, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            ref={(input: any) => (refInputArr.current[index] = input)}
          />
        );
      })}
    </div>
  );
};
