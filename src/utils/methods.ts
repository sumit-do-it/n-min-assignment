export const convertParamsToQueryString = (params: Record<string, string>) => {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};

export const mergeUniqueData = <T>(data: T[], newData: T[]) => {
  let mergedData = [];
  let ids = new Set();

  for (const item of data) {
    if (!ids.has(item.name)) {
      ids.add(item.name);
      mergedData.push(item);
    }
  }

  for (const item of newData) {
    if (!ids.has(item.name)) {
      ids.add(item.name);
      mergedData.push(item);
    }
  }

  return mergedData;
};

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
