import { PROJECT_PATH } from "constants/routes";

export const getProjectPath = (slug: string) =>
  PROJECT_PATH.replace(":slug", slug);
