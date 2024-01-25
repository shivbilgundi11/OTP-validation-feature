import { useState } from "react";
import OTPInputField from "./components/OTPInputField";

const App = () => {
  const [OTP, setOTP] = useState("");
  const [successfull, setSuccessfull] = useState("");
  const [error, seterror] = useState(false);

  const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    setOTP(otp);
    setSuccessfull("");
    seterror(false);
  };

  const onOTPSubmit = (otp) => {
    if (OTP == otp) {
      setSuccessfull("correct");
      setOTP("");
      seterror(false)
    } else {
      seterror(true);
    }
  };

  return (
    <section className="w-full p-5 flex flex-col items-start gap-3">
      <h1 className="text-2xl md:text-4xl text-center font-semibold">
        OTP Verification Feature
      </h1>

      <p className="text-lg text-slate-600">
        # Lets create a button that generates a random 4 digit number as a OTP.
      </p>

      <h3 className="text-[48px] font-semibold">{OTP}</h3>

      <button
        className="border-2 py-2 px-4 text-[18px] font-medium hover:shadow-lg hover:border-blue bg-black hover:bg-slate-900 text-white rounded-md mb-5"
        onClick={generateOTP}
      >
        Generate OTP
      </button>

      <hr className="w-full" />

      {successfull ? (
        <h1 className="text-4xl font-semibold text-green-500">
          Verified Successfully
        </h1>
      ) : null}

      {error ? (
        <h1 className="text-4xl font-semibold text-red-500">
          Enter the correct OTP
        </h1>
      ) : null}

      {/* Verification Component */}
      <OTPInputField otp={OTP} onOTPSubmit={onOTPSubmit} />
    </section>
  );
};

export default App;
