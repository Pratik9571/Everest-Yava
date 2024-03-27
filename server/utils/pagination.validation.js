import * as Yup from "yup";

export const paginationValidationSchema = Yup.object({
  page: Yup.number().default(1).min(1, "Page must be atleast 1."),
  limit: Yup.number().default(8).min(1, "Limit must be atleast 1."),
});
