import DOMPurify from "dompurify";

export const clean = (source: string) => DOMPurify.sanitize(source);

export const cleanForm = <T extends Record<string, any>>(data: T) => {
  for (const key in data) {
    data[key] = clean(data[key]) as T[Extract<keyof T, string>];
  }
  return data;
};
