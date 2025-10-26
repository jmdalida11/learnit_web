const API_BASE_URL = import.meta.env.VITE_API_URL;

type Config<T> = {
  body?: T;
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  csrfToken?: string;
};

const apiCall = async <T>(url: string, config: Config<T>) => {
  const options = {
    method: config.method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  } as any;

  if (config.body) {
    options["body"] = JSON.stringify(config.body);
  }
  if (config.csrfToken) {
    options.headers["X-CSRF-Token"] = config.csrfToken;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, options);
  // const result = await response.json();

  let result = null;
  const text = await response.text();
  if (text) {
    result = JSON.parse(text);
  }

  if (!response.ok) {
    const errorMessage =
      (result as any)?.message || response.statusText || "Unknown error";
    throw new Error(errorMessage);
  }

  return result;
};

export const api = {
  post: async <T>(url: string, config?: Omit<Config<T>, "method">) => {
    return apiCall(url, { ...config, method: "POST" });
  },
  get: (url: string) => {
    return apiCall(url, { method: "GET" });
  },
};
