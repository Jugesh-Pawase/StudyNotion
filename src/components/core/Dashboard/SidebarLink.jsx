import React from 'react'
import * as Icons from "react-icons/vsc"
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";

const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName] || AiOutlineShoppingCart ;
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <NavLink
        to={link.path}
        className={`relative flex gap-x-2 items-center text-sm font-medium px-3 md:px-8 py-2 cursor-pointer transition-all duration-200
        ${matchRoute(link.path) ? 'text-yellow-50 bg-yellow-800' : 'text-richblack-300'}`}
      >
        <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${matchRoute(link.path) ? ' opacity-100 ' : 'opacity-0'}`} >
        </span>

        <Icon className='text-lg' />
        <p className='hidden md:block uppercase tracking-wider'>{link.name}</p>
      </NavLink>
    )
}

export default SidebarLink