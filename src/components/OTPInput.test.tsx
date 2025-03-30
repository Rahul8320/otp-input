import { fireEvent, render, screen } from "@testing-library/react";
import { OTPInput } from "./OTPInput";

describe("OTP Input Component", () => {
  const otpLength = 4;

  test("renders the correct number of input fields", () => {
    render(<OTPInput otp_length={otpLength} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(otpLength);
  });

  test("focuses the first input on mount", () => {
    render(<OTPInput otp_length={otpLength} />);
    const firstInput = screen.getAllByRole("textbox")[0];
    expect(firstInput).toHaveFocus();
  });

  test("updates input value on valid digit entry", () => {
    render(<OTPInput otp_length={otpLength} />);
    const firstInput: any = screen.getAllByRole("textbox")[0];
    fireEvent.change(firstInput, { target: { value: "5" } });
    expect(firstInput.value).toBe("5");
  });

  test("focuses next input after entering a digit", () => {
    render(<OTPInput otp_length={otpLength} />);
    const firstInput = screen.getAllByRole("textbox")[0];
    fireEvent.change(firstInput, { target: { value: "5" } });
    const secondInput = screen.getAllByRole("textbox")[1];
    expect(secondInput).toHaveFocus();
  });

  test("ignores non-numeric input", () => {
    render(<OTPInput otp_length={otpLength} />);
    const firstInput: any = screen.getAllByRole("textbox")[0];
    fireEvent.change(firstInput, { target: { value: "a" } });
    expect(firstInput.value).toBe("");
  });

  test("focuses previous input on backspace from empty input", () => {
    render(<OTPInput otp_length={otpLength} />);
    const firstInput = screen.getAllByRole("textbox")[0];
    const secondInput = screen.getAllByRole("textbox")[1];

    // Focus on the second input and simulate backspace
    fireEvent.focus(secondInput);
    fireEvent.change(secondInput, { target: { value: "" } });
    fireEvent.keyDown(secondInput, { key: "Backspace" });

    expect(firstInput).toHaveFocus();
  });

  test("navigates left and right with arrow keys", () => {
    render(<OTPInput otp_length={otpLength} />);
    const firstInput = screen.getAllByRole("textbox")[0];
    const secondInput = screen.getAllByRole("textbox")[1];

    // Focus on the first input and navigate right
    fireEvent.focus(firstInput);
    fireEvent.keyDown(firstInput, { key: "ArrowRight" });
    expect(secondInput).toHaveFocus();

    // Navigate back to the first input
    fireEvent.keyDown(secondInput, { key: "ArrowLeft" });
    expect(firstInput).toHaveFocus();
  });

  test("fills all input fields correctly when entering a complete OTP", () => {
    render(<OTPInput otp_length={otpLength} />);
    const inputs: any = screen.getAllByRole("textbox");

    // Simulate entering a complete OTP
    fireEvent.change(inputs[0], { target: { value: "1" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });
    fireEvent.change(inputs[2], { target: { value: "3" } });
    fireEvent.change(inputs[3], { target: { value: "4" } });

    expect(inputs[0].value).toBe("1");
    expect(inputs[1].value).toBe("2");
    expect(inputs[2].value).toBe("3");
    expect(inputs[3].value).toBe("4");
  });

  test("renders the correct number of input fields - 2nd test", () => {
    render(<OTPInput otp_length={6} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(6);
  });

  test("allows user to input digits", () => {
    render(<OTPInput otp_length={6} />);
    const inputs: any = screen.getAllByRole("textbox");

    fireEvent.change(inputs[0], { target: { value: "1" } });
    expect(inputs[0].value).toBe("1");
    expect(inputs[1]).toHaveFocus();

    fireEvent.change(inputs[1], { target: { value: "2" } });
    expect(inputs[1].value).toBe("2");
    expect(inputs[2]).toHaveFocus();
  });
});
