import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { loginReducer, initialState } from "./reducer";

type CurrentPage = "Signin" | "Signup" | "History";

interface SigninPropsType {
  onSetCurrentPage: (input: CurrentPage) => void;
}

const Signin: React.FC<SigninPropsType> = ({
  onSetCurrentPage,
}: SigninPropsType) => {
  const [state, dispatch] = React.useReducer(loginReducer, initialState);
  const { email, password, isLoading, error } = state;

  const { handleSignIn }: any = useContext(AuthContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "login" });
    try {
      await handleSignIn(email, password);

      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  const handleNavigateToSignup = () => {
    onSetCurrentPage("Signup");
  };

  return (
    <>
      <div className="signup_form">
        <div>
          <h1 className="title">Sign In</h1>
          <h4 className="sub-title">
            Please fill in this form to login an account.
          </h4>
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="signup-details">
              <div>
                <input
                  value={email}
                  onChange={(e) =>
                    dispatch({
                      type: "field",
                      fieldName: "email",
                      payload: e.currentTarget.value,
                    })
                  }
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  required
                />
              </div>
            </div>
            <div className="signup-details">
              <input
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "password",
                    payload: e.currentTarget.value,
                  })
                }
                value={password}
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />
            </div>
            <button
              type="submit"
              className="primary-solid"
              disabled={isLoading}
            >
              Sign In
            </button>
          </form>
          <p className="small-text">
            <a href="#" onClick={handleNavigateToSignup}>
              SignUp
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
