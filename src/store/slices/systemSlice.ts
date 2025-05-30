import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export interface IMessage {
  message: string;
  type: 'success' | 'info' | 'error';
  id?: string;
}

interface ISystemSlice {
  messages: Array<IMessage>;
}

const initialState: ISystemSlice = {
  messages: [],
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    createSystemMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push({ ...action.payload, id: nanoid() });
    },
    removeSystemMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(({ id }) => action.payload !== id);
    },
  },
});

export const { createSystemMessage, removeSystemMessage } = systemSlice.actions;
