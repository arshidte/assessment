import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import loginReducer from './Slices/userSlice';
import questionReducer from './Slices/questionSlice';
import answerReducer from './Slices/answerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
    questions: questionReducer,
    answers: answerReducer
  },
});

export default store;