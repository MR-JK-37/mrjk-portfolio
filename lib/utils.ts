export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function cloudinaryDeliveryUrl(src: string, width = 1200) {
  if (!src.includes("res.cloudinary.com")) return src;
  return src.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${width}/`);
}
