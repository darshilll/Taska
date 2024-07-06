/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URL = "http://localhost:8800";

const API_URL = "https://taska-fwm0.onrender.com";

const baseQuery = fetchBaseQuery({ baseUrl: API_URL + "/api" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
