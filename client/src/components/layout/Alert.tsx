import { useEffect, useState } from "react"
import { useUIState } from "../../context/context"

const Alert = () => {
    const { alertMessage } = useUIState()
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (alertMessage) setShow(true)
        else setShow(false)
        return () => setShow(false)
    }, [alertMessage])

    return (
        <div
            className={`w-full flex justify-center items-center z-40 toast ${show ? "show" : ""}`}
        >
            {show && (
                <p className='mx-6 leading-8 bg-stone-900 text-white font-medium py-2 px-4 text-center rounded-lg box-shadow md:px-6 md:mx-0 md:max-w-xl'>
                    {alertMessage}
                </p>
            )}
        </div>
    )
}

export default Alert