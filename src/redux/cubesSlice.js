import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cubes: [
    { y: 0, x: 0, id: 1 },
  ]
};

const cubesSlice = createSlice({
  name: 'cubes',
  initialState: initialState,
  reducers: {
    changeCubes(state, action) {
      state.cubes = action.payload
    }
  }
});

export const { changeCubes } = cubesSlice.actions;
export default cubesSlice.reducer;