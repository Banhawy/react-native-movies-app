import { useEffect, useState } from "react";

const useFetch = <T>(fetchFn: () => Promise<T>, autofetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFn();

            setData(result);
        } catch (error) {
            setError(error instanceof Error ? error : new Error("An unexpected error occurred"));
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setLoading(true);
        setError(null);
    }

    useEffect(() => {
        if (autofetch) {
            fetchData();
        }
    }, []);

    return {
        data,
        loading,
        error,
        fetchData,
        refetch: fetchData,
        reset,
    };
}

export default useFetch;