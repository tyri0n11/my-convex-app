import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const useDashboard = () => {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  
  const addNumber = useMutation(api.myFunctions.addNumber);

  const handleAddRandomNumber = () => {
    void addNumber({ value: Math.floor(Math.random() * 10) });
  };

  return {
    viewer,
    numbers,
    handleAddRandomNumber,
    isLoading: viewer === undefined || numbers === undefined
  };
};
