interface SignupState {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  error: string;
  isLoading: Boolean;
}

type SignupAction =
  | { type: "signup" | "success" | "error" }
  | { type: "field"; fieldName: string; payload: string };

export const signupReducer = (
  state: SignupState,
  action: SignupAction
): SignupState => {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case "signup": {
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    }
    case "success": {
      return { ...state, error: "", isLoading: false };
    }
    case "error": {
      return {
        ...state,
        isLoading: false,
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
        error: "Incorrect details!",
      };
    }
    default:
      return state;
  }
};

export const initialState: SignupState = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  error: "",
  isLoading: false,
};
