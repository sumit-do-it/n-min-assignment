import { useCallback, useEffect, useRef, useState } from "react";
import { mergeUniqueData } from "utils/methods";

//NOTE: using the component state, we can also use redux, mobx to manage the state but we should use them when you are using shared state as well as complex state management.

interface UsePaginationProps<T, R> {
  apiCall: (url?: string, params?: Record<string, string>) => Promise<R>;
  apiParams?: Record<string, string>;
  data: T[];
  setData: (data: T[], extraData?: Partial<R>) => void;
}

function usePagination<T, R>({
  apiCall,
  apiParams,
  data,
  setData,
}: UsePaginationProps<T, R>) {
  const [loading, setLoading] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const nextPage = useRef<string | undefined>(undefined); // will keep the next page url

  const fetchData = useCallback(
    async (type: number) => {
      setLoading(type);
      setError(null);
      try {
        if (type === 2 && !nextPage.current) {
          return;
        }

        let nextUrl = type === 2 ? nextPage.current : undefined;
        let nextParams = nextUrl ? undefined : apiParams; // params are already in the url, so we don't need to pass them again

        const response = await apiCall(nextUrl, nextParams);

        const uniqueData =
          type === 2
            ? mergeUniqueData<T>(data, response.results as T[])
            : (response.results as T[]);

        setData(uniqueData, response);
        nextPage.current = response?.next as string;
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(0);
      }
    },
    [apiCall, apiParams, setData, data]
  );

  useEffect(() => {
    fetchData(1);
  }, [apiParams]);

  const loadMore = useCallback(() => {
    fetchData(2);
  }, [fetchData]);

  const refresh = useCallback(() => {
    fetchData(3);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    loadMore,
    refresh,
  };
}

export default usePagination;
