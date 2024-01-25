import { useEffect, useRef, useState } from "react";

/* eslint-disable react/prop-types */
const OTPInputField = ({ otp, onOTPSubmit }) => {
  const [OTP, setOTP] = useState(new Array(otp.toString().length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    setOTP(new Array(otp.toString().length).fill(""));
  }, [otp]);

  //HandleChangeForInputValue...
  const handleChange = (e, i) => {
    const myvalue = e.target.value;

    if (isNaN(myvalue)) return;

    const newOTP = [...OTP];
    newOTP[i] = myvalue.substring(myvalue.length - 1);
    setOTP(newOTP);

    //Submit Trigger
    const combinedOTP = newOTP.join("");
    if (combinedOTP.length === OTP.length) {
      onOTPSubmit(combinedOTP);
    }

    if (myvalue && i < OTP.length - 1 && inputRefs.current[i + 1]) {
      inputRefs.current[i + 1].focus();
    }

    if (myvalue && i < OTP.length - 1 && OTP[i + 1]) {
      inputRefs.current[i + 2].focus();
    }
  };

  //HandleClickForInputValue...
  const handleClick = (i) => {
    inputRefs.current[i].setSelectionRange(1, 1);

    if (i > 0 && !OTP[i - 1]) {
      inputRefs.current[i - 1].focus();
    }

    if (i > 1 && !OTP[i - 2]) {
      inputRefs.current[i - 2].focus();
    }

    if (!OTP[0]) {
      inputRefs.current[0].focus();
    }
  };

  //HandleKeyDownForInputValue...
  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !OTP[i] && i > 0 && inputRefs.current[i - 1]) {
      inputRefs.current[i - 1].focus();
    }

    if (e.key === "Tab" && i > 0 && !OTP[i - 1]) {
      inputRefs.current[i - 1].focus();
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 mt-8">
      {otp && <p className="text-xl font-medium">Enter the above OTP</p>}

      <div className="flex items-center gap-2">
        {OTP.map((val, i) => {
          return (
            <input
              type="text"
              key={i}
              value={val}
              ref={(input) => (inputRefs.current[i] = input)}
              onChange={(e) => handleChange(e, i)}
              onClick={() => handleClick(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="border-2 w-[50px] h-[50px] rounded-md text-center text-xl font-semibold"
            />
          );
        })}
      </div>
    </div>
  );
};

export default OTPInputField;
