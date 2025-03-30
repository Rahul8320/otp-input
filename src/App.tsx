import { OTPInput } from "./components/OTPInput";

const OTP_LENGTH = 6;

function App() {
  return (
    <div className="app">
      <h1>Please input your OTP</h1>
      <OTPInput otp_length={OTP_LENGTH} />
    </div>
  );
}

export default App;
