const { useState } = React;

const App = () => {
  const [formValidation, setFormValidation] = useEffect(["", "", "", ""]);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    passord: "",
  });

  function isAlphanumeric(str) {
    return str.match(/^[a-zA-Z0-9]+$/) !== null;
  }
  function isAlphabets(str) {
    return str.search(/[^a-zA-Z]+/) === -1;
  }
  function containsUppercase(str) {
    return /[A-Z]/.test(str);
  }
  function containsLowercase(str) {
    return /[a-z]/.test(str);
  }
  function containsdigit(str) {
    return /\d/.test(str);
  }
  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  const onChangeHandler = (event, text) => {
    if (text === "firstName") {
      setUserData((prev) => {
        return { ...prev, firstName: event.target.value };
      });
      if (!isAlphabets(userData.firstName)) {
        setFormValidation((prev) => {
          let newState = [...prev];
          newState[0] = "First Name must be Alphabets without Spaces";
        });
      }
    } else if (text === "lastName") {
      setUserData((prev) => {
        return { ...prev, lastName: event.target.value };
      });
      if (!isAlphabets(userData.lastName)) {
        setFormValidation((prev) => {
          let newState = [...prev];
          newState[1] = "Last Name must be Alphabets without Spaces";
        });
      }
    } else if (text === "username") {
      setUserData((prev) => {
        return { ...prev, username: event.target.value };
      });
      let UserName = userData.username;
      if (
        !isAlphanumeric(UserName) &&
        UserName.trim().length > 5 &&
        UserName.trim().length < 30 &&
        (UserName.includes(".") || UserName.includes("_"))
      ) {
        setFormValidation((prev) => {
          let newState = [...prev];
          newState[2] =
            "Username must be AlphaNumeric with length5 to 30 characters & must contain a special charater (. or _)";
        });
      }
    } else {
      setUserData((prev) => {
        return { ...prev, password: event.target.value };
      });
      let Password = userData.password;
      if (
        containsUppercase(Password) &&
        containsLowercase(Password) &&
        containsdigit(Password) &&
        containsSpecialChars(Password) &&
        UserName.trim().length > 7 &&
        UserName.trim().length < 16
      ) {
        setFormValidation((prev) => {
          let newState = [...prev];
          newState[3] =
            "Password must have length between 7 to 16 & contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character";
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="gap-y-5 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center">SignUp</h1>
        <form onSubmit={handleSubmit}>
          <div className="gap-y-5 px-5 flex flex-col items-center">
            <div className="flex flex-row items-center justify-between">
              <div className="w-[40%] flex flex-col items-start">
                <label htmlFor="firstname">Firstname</label>
                <input
                  style={{ border: "1px solid black", marginRight: "15px" }}
                  className="border-[1px] border-[#B7B7B7] rounded-full px-3 py-1 text-lg"
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={userData.firstName}
                  onChange={(event) => {
                    onChangeHandler(event, "firstName");
                  }}
                  required
                />
                {formValidation[0] !== "" && (
                  <p className="text-red-500">{formValidation[0]}</p>
                )}
              </div>
              <div className="w-[40%] flex flex-col items-start">
                <label htmlFor="lastname">Lastname</label>
                <input
                  style={{ border: "1px solid black" }}
                  className="border-[1px] border-[#B7B7B7] rounded-full px-3 py-1 text-lg"
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={userData.lastName}
                  onChange={(event) => {
                    onChangeHandler(event, "lastName");
                  }}
                  required
                />
                {formValidation[1] !== "" && (
                  <p className="text-red-500">{formValidation[1]}</p>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="w-[49%] flex flex-col items-start">
                <label htmlFor="username">Username</label>
                <input
                  style={{ border: "1px solid black", marginRight: "15px" }}
                  className="border-[1px] border-[#B7B7B7] rounded-full px-3 py-1 text-lg"
                  type="text"
                  name="username"
                  id="username"
                  value={userData.username}
                  onChange={(event) => {
                    onChangeHandler(event, "username");
                  }}
                  required
                />
                {formValidation[2] !== "" && (
                  <p className="text-red-500">{formValidation[2]}</p>
                )}
              </div>
              <div className="w-[49%] flex flex-col items-start">
                <label htmlFor="password">Password</label>
                <input
                  style={{ border: "1px solid black" }}
                  className="border-[1px] border-[#B7B7B7] rounded-full px-3 py-1 text-lg"
                  type="text"
                  name="password"
                  id="password"
                  value={userData.password}
                  onChange={(event) => {
                    onChangeHandler(event, "password");
                  }}
                  required
                />
                {formValidation[3] !== "" && (
                  <p className="text-red-500">{formValidation[3]}</p>
                )}
              </div>
            </div>
            <button
              style={{ border: "1px solid black" }}
              type="submit"
              className="border-[1px] border-[#B7B7B7] rounded-full px-3 py-1 text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
