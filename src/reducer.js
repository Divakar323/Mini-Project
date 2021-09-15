export const initialState = {
  user: null,
  recordedVoice: null,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_AUDIO":
      return {
        ...state,
        recordedVoice: action.recordedVoice,
      };

    default:
      return state;
  }
};

export default reducer;
