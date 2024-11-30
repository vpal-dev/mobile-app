import { supabase } from "./supabase";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log("API URL", API_URL)

export class APIFetchKlass {
  // session: Session | null;
  accessToken: string;

  constructor() {
    // this.session = null;
    this.accessToken = "";
  }

  public async setupSession() {
    if (this.accessToken) {
      return;
    }

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log("getting session error", error)
    }

    if (!data?.session) {
      return
    }

    this.accessToken = String(data.session?.access_token);
  }

  // authenticated requests
  async get(endpoint: string) {
    await this.setupSession();

    const resRaw = await fetch(`${API_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const res = await resRaw.json();

    if (!resRaw.ok) {
      throw new Error(res.error);
    }

    return res;
  }

  async post(endpoint: string, op: { body?: object }) {
    await this.setupSession();

    console.log("API URL", `${API_URL}/${endpoint}`)
    const resRaw = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
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


export const APIFetch = new APIFetchKlass();
