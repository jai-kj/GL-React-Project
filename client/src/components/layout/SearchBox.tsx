import { useEffect, useMemo, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useUIDispatch } from "../../context/context"
import { SearchBoxProps } from "../../model/IMovies"

const SearchBox = ({ url }: SearchBoxProps) => {
    const text = useRef<HTMLInputElement>(null)
    const { pathname } = useLocation()
    const { filterMovies, resetFilteredMovies } = useUIDispatch()

    const isDisabled = useMemo(() => pathname?.includes("/movie/"), [pathname])

    const handleClear = () => {
        if (!isDisabled && text?.current?.value) {
            text.current.value = ""
            resetFilteredMovies()
        }
    }

    const handleChange = () => {
        if (!text?.current?.value?.trim()) return resetFilteredMovies()
        if (text?.current?.value?.includes("\\")) return

        filterMovies(url, text?.current?.value?.trim())
    }

    useEffect(() => {
        if (url && text?.current) {
            text.current.value = ""
            resetFilteredMovies()
        }
    }, [url, resetFilteredMovies])

    return (
        <div className='w-48 lg:w-72 flex items-center relative border-b border-stone-500'>
            <div className='w-1/12 flex justify-center -rotate-45 text-2xl cursor-default'>
                &#9906;
            </div>
            <div className='w-10/12'>
                <input
                    type='text'
                    placeholder='Search movie ...'
                    className={`w-full px-1 outline-none font-medium bg-white ${isDisabled ? "cursor-not-allowed" : "cursor-auto"
                        }`}
                    disabled={isDisabled}
                    ref={text}
                    onChange={handleChange}
                />
            </div>
            <div
                className={`w-1/12 flex justify-center text-2xl text-red-500 font-bold ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                    } hover:scale-110`}
                onClick={handleClear}
            >
                &times;
            </div>
        </div>
    )
}

export default SearchBox
