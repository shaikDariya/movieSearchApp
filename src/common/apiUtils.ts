export const apiBaseUrl: string = "https://www.omdbapi.com/?apikey=eaa9d1e0";
const jsonWrapper = (method: string) => async (
  path: string,
  init: any = {}
): Promise<any> => {
  const response = await fetch(`${apiBaseUrl}&${path}`, {
    ...init,
    method,
    headers: {
      ...init.headers
    }
  });
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  try {
    return await response.json();
  } catch (e) {
    console.warn("Json Parse Error", e);
    return null;
  }
};

export const fetchJson = jsonWrapper("get");
