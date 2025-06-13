import axiosInstance from "./axiosInstance";

export const searchRides = (filters) =>
  axiosInstance.get("/rides/search", { params: filters });

export const createRide = (data) =>
  axiosInstance.post("/rides", data);
