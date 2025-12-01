import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from './projectService';

const initialState = {
  projects: [],
  currentProject: null, // <-- Stores the single project we are viewing
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// --- EXISTING THUNKS ---

export const getProjects = createAsyncThunk('projects/getAll', async (_, thunkAPI) => {
  try { return await projectService.getProjects(thunkAPI); } 
  catch (error) { return thunkAPI.rejectWithValue(error.toString()); }
});

export const createProject = createAsyncThunk('projects/create', async (data, thunkAPI) => {
  try { return await projectService.createProject(data, thunkAPI); } 
  catch (error) { return thunkAPI.rejectWithValue(error.toString()); }
});

// --- NEW THUNKS (Tasks & Kanban) ---

// Get Single Project
export const getProject = createAsyncThunk('projects/getOne', async (id, thunkAPI) => {
  try { return await projectService.getProject(id, thunkAPI); } 
  catch (error) { return thunkAPI.rejectWithValue(error.toString()); }
});

// Update Project Status (For Kanban Board)
export const updateProjectStatus = createAsyncThunk(
  'projects/updateStatus',
  async ({ projectId, status }, thunkAPI) => {
    try {
      return await projectService.updateProjectStatus(projectId, status, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

// Add Task
export const addTask = createAsyncThunk('projects/addTask', async ({ projectId, taskData }, thunkAPI) => {
  try { return await projectService.addTask(projectId, taskData, thunkAPI); } 
  catch (error) { return thunkAPI.rejectWithValue(error.toString()); }
});

// Toggle Task Complete
export const toggleTask = createAsyncThunk('projects/toggleTask', async ({ projectId, taskId, isCompleted }, thunkAPI) => {
  try { return await projectService.updateTask(projectId, taskId, { isCompleted }, thunkAPI); } 
  catch (error) { return thunkAPI.rejectWithValue(error.toString()); }
});

// Delete Task
export const deleteTask = createAsyncThunk('projects/deleteTask', async ({ projectId, taskId }, thunkAPI) => {
  try { 
    await projectService.deleteTask(projectId, taskId, thunkAPI);
    return taskId; // Return ID to filter it out
  } 
  catch (error) { return thunkAPI.rejectWithValue(error.toString()); }
});

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.currentProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Projects List
      .addCase(getProjects.pending, (state) => { state.isLoading = true; })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      
      // Update Status (Kanban Move)
      .addCase(updateProjectStatus.fulfilled, (state, action) => {
        // Update in the list
        const index = state.projects.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        // Update current view if applicable
        if (state.currentProject && state.currentProject._id === action.payload._id) {
          state.currentProject = action.payload;
        }
      })

      // Single Project
      .addCase(getProject.pending, (state) => { state.isLoading = true; })
      .addCase(getProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentProject = action.payload;
      })

      // Tasks
      .addCase(addTask.fulfilled, (state, action) => {
        state.currentProject.tasks.push(action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.currentProject.tasks.findIndex(t => t._id === action.payload._id);
        if(index !== -1) state.currentProject.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.currentProject.tasks = state.currentProject.tasks.filter(t => t._id !== action.payload);
      });
  },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;