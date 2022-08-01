import { useCallback, useMemo, useState } from "react"
import axios, { AxiosRequestConfig } from "axios"
import { useUIDispatch } from "../context/context"

axios.defaults.baseURL = "http://localhost:5000"

const useFetch = (isArray: boolean = true) => {
    const { getMovieLists } = useUIDispatch()
    const [loading, setLoading] = useState<boolean>()
    const [error, setError] = useState<any>(null)

    const fetchData = useCallback(async (params: AxiosRequestConfig, url: string) => {
        setLoading(true)
        try {
            const res = await axios.request(params)
            if (isArray)
                getMovieLists(url, res.data)
        } catch (error) {
            axios?.isAxiosError(error)
                ? setError(error.message ?? "Server Error")
                : setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    return useMemo(
        () => ({
            loading,
            error,
            fetchData,
        }),
        [error, loading, fetchData]
    )
}

export default useFetch
