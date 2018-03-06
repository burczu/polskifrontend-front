import * as constants from '../../constants';

export const initialState = {
  email: '',
  emailValid: false,
  emailDirty: false,
  feedback: '',
  feedbackValid: false,
  feedbackDirty: false,
  captcha: null,
  sending: false,
  sent: false,
  sendError: false,
  sendErrorMessage: '',
  shouldCleanUp: false
};

export default function feedbackReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FEEDBACK_TEXT_CHANGED_VALID:
      return {
        ...state,
        feedback: action.payload.value,
        feedbackDirty: true,
        feedbackValid: action.payload.isValid,
        shouldCleanUp: false
      };
    case constants.FEEDBACK_EMAIL_CHANGED_VALID:
      return {
        ...state,
        email: action.payload.value,
        emailDirty: true,
        emailValid: action.payload.isValid,
        shouldCleanUp: false
      };
    case constants.FEEDBACK_CAPTCHA_CHANGED:
      return { ...state, captcha: action.payload.value, shouldCleanUp: false };

    case constants.FEEDBACK_SEND:
      return {
        ...state,
        sending: true,
        sendError: false,
        sendErrorMessage: '',
        shouldCleanUp: false
      };
    case constants.FEEDBACK_SEND_SUCCESS:
      return {
        ...state,
        sending: false,
        sendError: false,
        sendErrorMessage: '',
        sent: true,
        shouldCleanUp: false
      };
    case constants.FEEDBACK_SEND_ERROR:
      return {
        ...state,
        sent: false,
        sending: false,
        sendError: true,
        sendErrorMessage: action.payload.message,
        shouldCleanUp: false
      };

    case constants.FEEDBACK_STATE_RESET:
      return { ...initialState, shouldCleanUp: true };
    default:
      return { ...state };
  }
}
