import React, { useEffect, useState } from 'react'
import logo from "../../Asset/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/Navbar-Link'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDown } from "react-icons/io";

function Navbar() {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("Printing sublinks/categories results ", result);
            setSubLinks(result?.data?.data);
        } catch (error) {
            console.log("Could not fetch the category list");
        }
    }

    useEffect(() => {
        fetchSublinks();
    }, [])

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                {/* Image */}
                <Link to="/">
                    <img src={logo} width={160} height={42} loading='lazy' />
                </Link>

                {/* Nav Links  */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div className={`group relative flex cursor-pointer items-center gap-1 
                                                ${matchRoute("/catalog/:catalogName/*") ? "text-yellow-25" : "text-richblack-25"}`}>
                                                <p>{link.title}</p>
                                                <IoIosArrowDown />

                                                <div className='absolute invisible left-[50%] right-[50%] top-[50%] z-[1000] flex flex-col rounded-md bg-richblack-5 p-4 w-[200px] lg:w-[300px]
                                                translate-x-[-50%] translate-y-[80%]
                                                text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100'>

                                                    <div className='absolute left-[50%] top-0 -z-10 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5 '>
                                                    </div>
                                                    {loading ? (
                                                        <p className="text-center">Loading...</p>
                                                    ) : subLinks?.length ? (
                                                        subLinks
                                                            .filter((subLink) => subLink?.courses?.length > 0)
                                                            .map((subLink, index) => (
                                                                <Link
                                                                    to={`/catalog/${subLink.name.trim().split(" ").join("-").split("/").join("-").toLowerCase()}`}
                                                                    className="rounded-lg py-4 pl-4 hover:bg-richblack-50"
                                                                    key={index}
                                                                >
                                                                    <p className="uppercase tracking-wider">{subLink.name}</p>
                                                                </Link>
                                                            ))
                                                    ) : (
                                                        <p className="text-center">No Courses Found</p>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25" :
                                                    "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Login/Signup/Dashboard  */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="dashboard/cart" className='relative'>
                                <IoCartOutline />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token == null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token == null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-md'>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token != null && <ProfileDropDown />
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar