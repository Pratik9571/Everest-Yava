import Yup from "yup";

export let addProductValidationSchema = Yup.object({
  name: Yup.string()
    .required("Product's name is required.")
    .trim()
    .max(55, "Product's name must be at max 55 characters."),
  brand: Yup.string()
    .required("Product's brand is required.")
    .trim()
    .max(55, "Product's brand must be at max 55 characters."),
  price: Yup.number()
    .required("Price is required.")
    .min(0, "Price must be atleast 0."),
  quantity: Yup.number().nullable(),
  category: Yup.string()
    .required("Category is required.")
    .trim()
    .oneOf(["coffee", "smoothie", "tea", "milkshake", "breakfast", "bakery"]),
  description: Yup.string()
    .required("Description is required.")
    .trim()
    .max(1000, "Description must be at max 1000 characters.")
    .min(250, "Description must be at max 250 characters."),
  planningTo: Yup.string()
    .required("You must mention either it is Dine-in or Take-away.")
    .trim()
    .oneOf(["dine-in", "take-away", "both"]),
  image: Yup.string().trim().nullable(),
});
