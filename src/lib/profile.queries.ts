import { queryOptions } from "@tanstack/react-query";
import { getMyProfile } from "./profile.functions";

export const profileQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: () => getMyProfile(),
});
