import axios from "axios";

import { BASE_URL, supabase_api_key } from "../constants";
import { getUser } from "./getUser";

export default async function refreshToken() {
  const user = await getUser();
  const endpoint = `${BASE_URL}token?grant_type=refresh_token`;
  const { data } = await axios.post(
    endpoint,
    { refresh_token: user.refresh_token },
    {
      headers: { apikey: supabase_api_key },
    }
  );
  const {
    access_token,
    refresh_token,
    expires_at,
    user: { id: user_id },
  } = data;
  localStorage.setItem(
    "user",
    JSON.stringify({ access_token, refresh_token, expires_at, user_id })
  );
  return access_token;
}
