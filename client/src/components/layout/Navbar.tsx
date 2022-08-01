import { useState } from "react"
import { INavLink, NavbarProps } from "../../model/IMovies"

const Navbar = ({ navLinks, screen, setScreen }: NavbarProps) => {
    const [showMobileNavbar, setShowMobileNavbar] = useState(false)
    return (
        <nav className='h-16 shadow-lg z-10'>
            <div className='container mx-auto h-full flex justify-between items-center px-4 lg:px-12'>
                <div className='nav-brand font-bold text-2xl text-blue-500 hover:text-blue-800'>
                    JMovies
                </div>

                <ul className='hidden items-center lg:flex lg:space-x-8'>
                    {navLinks.map((navLink: INavLink, index: number) => (
                        <li
                            key={index}
                            className={`py-2 cursor-pointer border-b-2 font-semibold ${index === screen
                                ? "border-blue-500 text-blue-500"
                                : "border-transparent text-stone-500"
                                }`}
                            onClick={() => setScreen(index)}
                        >
                            {navLink?.name}
                        </li>
                    ))}
                </ul>

                <button
                    id='menu-btn'
                    className={`flex flex-col space-y-1 justify-center lg:hidden focus:outline-none`}
                    type='button'
                    onClick={() => setShowMobileNavbar(!showMobileNavbar)}
                >
                    <span
                        className={`bg-blue-500 w-6 h-0.5 transition duration-300 ${showMobileNavbar
                            ? "translate-x-0.5 translate-y-1 rotate-45"
                            : "rotate-0"
                            }`}
                    ></span>
                    <span
                        className={`bg-blue-500 w-6 h-0.5 transition duration-300 rotate-0 ${showMobileNavbar ? "hidden" : "block"
                            }`}
                    ></span>
                    <span
                        className={`bg-blue-500 w-6 h-0.5 transition duration-300 ${showMobileNavbar
                            ? "translate-x-0.5 -translate-y-0.5 -rotate-45"
                            : "rotate-0"
                            }`}
                    ></span>
                    <span className='hidden'>Button</span>
                </button>
            </div>
            <div
                className={`${showMobileNavbar ? "block" : "hidden"} lg:hidden`}
            >
                <ul className='absolute shadow-lg w-full flex flex-col text-stone-500 items-center font-medium space-y-3 z-10 bg-white pb-3'>
                    {navLinks.map((navLink, index) => (
                        <li
                            key={index}
                            className={`py-1 cursor-pointer border-b-2 font-semibold ${index === screen
                                ? "border-blue-500 text-blue-500"
                                : "border-transparent text-stone-500"
                                }`}
                            onClick={() => {
                                setScreen(index)
                                setShowMobileNavbar(false)
                            }}
                        >
                            {navLink?.name}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
