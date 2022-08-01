import { useState } from "react"
import { Link } from "react-router-dom"

import SearchBox from "./SearchBox"
import { INavLink, NavbarProps } from "../../model/IMovies"

const Navbar = ({ navLinks, screen, setScreen }: NavbarProps) => {
    const [showMobileNavbar, setShowMobileNavbar] = useState(false)
    return (
        <nav className='h-16 shadow-md z-10'>
            <div className='container mx-auto h-full flex justify-between items-center px-4 xl:px-12'>
                <div className='nav-brand font-bold text-2xl text-blue-500 hover:text-blue-600 cursor-pointer'>
                    <Link to='/'>JMovies</Link>
                </div>

                <div className='hidden xl:flex items-center xl:space-x-8 h-full'>
                    <ul className='hidden items-center xl:flex xl:space-x-8'>
                        {navLinks.map((navLink: INavLink, index: number) => (
                            <Link
                                to='/'
                                key={index}
                                className={`py-2 cursor-pointer border-b-2 font-semibold ${index === screen
                                    ? "border-blue-500 text-blue-500"
                                    : "border-transparent text-stone-500"
                                    }`}
                                onClick={() => setScreen(index)}
                            >
                                <li>{navLink?.name}</li>
                            </Link>
                        ))}
                    </ul>
                    <SearchBox url={navLinks[screen]?.url} />
                </div>
                <div className='flex items-center space-x-6 xl-space-x-0 xl:hidden h-full'>
                    <SearchBox url={navLinks[screen]?.url} />
                    <button
                        id='menu-btn'
                        className={`flex flex-col space-y-1 justify-center xl:hidden focus:outline-none`}
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
            </div>
            <div
                className={`${showMobileNavbar ? "block" : "hidden"} xl:hidden`}
            >
                <ul className='absolute shadow-md w-full flex flex-col text-stone-500 items-center font-medium space-y-3 z-10 bg-white pb-3'>
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
