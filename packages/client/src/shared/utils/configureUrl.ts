import { API_RESOURCES_URL, API_URL } from "../config";

export const configureResourcePath = (path?: string | null) =>
  `${API_URL}/${API_RESOURCES_URL}${path ? path : ""}`;
