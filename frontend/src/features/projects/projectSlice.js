import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from './projectService';

const initialState = {
  projects: [],
  currentProject: null, // <-- 1. ADD NEW STATE FOR SINGLE PROJECT
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new project
export const createProject = createAsyncThunk(
  // ... (existing code, no changes) ...
  'projects/create',
  async (projectData, thunkAPI) => {
    try {
      return await projectService.createProject(projectData, thunkAPI);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user projects
export const getProjects = createAsyncThunk(
  // ... (existing code, no changes) ...
  'projects/getAll',
  async (_, thunkAPI) => {
    try {
      return await projectService.getProjects(thunkAPI);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --- 2. ADD NEW THUNKS ---

// Get single project
export const getProjectById = createAsyncThunk(
  'projects/getOne',
  async (projectId, thunkAPI) => {
    try {
      return await projectService.getProjectById(projectId, thunkAPI);
    } catch (error ){
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add task
export const addTask = createAsyncThunk(
  'projects/addTask',
  async ({ projectId, taskData }, thunkAPI) => {
    try {
      return await projectService.addTask({ projectId, taskData }, thunkAPI);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  'projects/updateTask',
  async ({ projectId, taskId, taskData }, thunkAPI) => {
    try {
      return await projectService.updateTask({ projectId, taskId, taskData }, thunkAPI);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  'projects/deleteTask',
  async ({ projectId, taskId }, thunkAPI) => {
    try {
      await projectService.deleteTask({ projectId, taskId }, thunkAPI);
      return taskId; // Return the taskId so we can filter it out of state
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    reset: (state) => {
      // Reset all, but keep project list
      state.currentProject = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    // We'll also reset the main list
    resetProjects: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // ... (existing createProject cases, no changes) ...
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // ... (existing getProjects cases, no changes) ...
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // --- 3. ADD NEW REDUCER CASES ---
      
      // Get Single Project
      .addCase(getProjectById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentProject = action.payload; // Set the single project
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Add Task
      .addCase(addTask.fulfilled, (state, action) => {
        if (state.currentProject) {
          state.currentProject.tasks.push(action.payload);
        }
      })

      // Update Task
      .addCase(updateTask.fulfilled, (state, action) => {
        if (state.currentProject) {
          const taskIndex = state.currentProject.tasks.findIndex(
            (task) => task._id === action.payload._id
          );
          if (taskIndex !== -1) {
            state.currentProject.tasks[taskIndex] = action.payload;
          }
        }
      })

      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (state.currentProject) {
          state.currentProject.tasks = state.currentProject.tasks.filter(
            (task) => task._id !== action.payload // action.payload is the taskId
          );
        }
      });
  },
});

export const { reset, resetProjects } = projectSlice.actions; // Update exports
export default projectSlice.reducer;