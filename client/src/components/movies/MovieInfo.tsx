import { Link } from "react-router-dom"
import { useUIDispatch } from "../../context/context"

const MovieInfo = () => {
    const { resetMovie } = useUIDispatch()

    return (
        <div className='w-full h-full py-4'>
            <Link
                to='/'
                onClick={() => resetMovie()}
                className='border border-stone-500 rounded-md py-2 px-4 hover:border-blue-500 hover:bg-blue-500 hover:text-white'
            >
                &#8592; Back
            </Link>
        </div>
    )
}

export default MovieInfo
