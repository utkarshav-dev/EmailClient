import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Email {
  id: string;
  subject: string;
  recipient: string;
  body: string;
  status: 'Draft' | 'Sent';
}

interface EmailState {
  emails: Email[];
}

const initialState: EmailState = {
  emails: [],
};

const emailSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    addEmail: (state, action: PayloadAction<Email>) => {
      state.emails.push(action.payload);
    },
    updateEmail: (state, action: PayloadAction<Email>) => {
      const index = state.emails.findIndex((email) => email.id === action.payload.id);
      if (index !== -1) {
        state.emails[index] = action.payload;
      }
    },
  },
});

export const { addEmail, updateEmail } = emailSlice.actions;
export default emailSlice.reducer;
