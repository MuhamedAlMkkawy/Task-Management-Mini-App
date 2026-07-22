import * as yup from "yup";

export const useTaskSchema = () => {
  return yup.object({
    title: yup
      .string()
      .required("Title is required.")
      .min(3, "Title must be at least 3 characters.")
      .max(100, "Title must not exceed 100 characters."),
      
      description: yup
      .string()
      .nullable()
      .min(10, "Description must be at least 10 characters.")
      .max(500, "Description must not exceed 500 characters."),

    status: yup
      .string()
      .required("Status is required."),

    dueDate: yup
      .date()
      .required("Due date is required.")
      .min(new Date(), "Due date must be in the future."),
  });
};