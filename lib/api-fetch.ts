import { supabase } from "./supabase";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class APIFetch {
  // authenticated requests
  static async get(endpoint: string) {
    // const token = await supabase.auth.getSession();
    // const accessToken = token.data.session?.access_token;

    const resRaw = await fetch(`${API_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },
    });

    const res = await resRaw.json();

    if (!resRaw.ok) {
      throw new Error(res.error);
    }

    return res;
  }

  static async post(endpoint: string, op: { body?: object }) {
    // const token = await supabase.auth.getSession();
    // const accessToken = token.data.session?.access_token;

    console.log("SENT")

    console.log("API URL", `${API_URL}/${endpoint}`)
    const resRaw = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(op.body),
    });

    const res = await resRaw.json();

    if (!resRaw.ok) {
      throw new Error(res.error);
    }

    return res;
  }
}


