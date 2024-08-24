import { FaRegUserCircle } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import flag from "../assets/flag.webp"
import { Link, Outlet } from 'react-router-dom';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { PiSignOutBold } from 'react-icons/pi';

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                {/* Page content here */}
                <div className="navbar shadow-md rounded justify-between pr-4 md:pr-12">
                    <div className='hidden lg:block'>
                        <p className='font-bold pl-2'>Company Registration</p>
                    </div>
                    <div>
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className='lg:hidden'>
                        <p>Logo</p>
                    </div>

                    <div className='flex '>
                        <div className=" hidden lg:block">
                            <div className='avatar flex align-middle items-center'>
                                <div className="w-6 rounded-full  ">
                                    <img src={flag} />
                                </div>
                                <p className='ml-2'>Eng</p>
                            </div>
                        </div>
                        <div className='mx-3 color'>
                            <p className='bg-sky-500 p-1 rounded'>
                                <IoMdNotifications className='bg-sky-500 text-white' />
                            </p>
                        </div>
                        <div className='flex align-middle items-center '>
                            <FaRegUserCircle className='h-[20px] w-[20px]'/>
                            <p className='ml-2'>User</p>
                        </div>
                    </div>
                </div>
                <div className='p-4 bg-slate-100'>
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side shadow-md rounded">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu text-base-content min-h-full w-[75%] md:w-72 p-4">
                    {/* Sidebar content here */}
                    <li className='mx-auto text-lg mb-5'><a className='hidden md:block'>Logo</a></li>
                    <li><Link to="/"><MdOutlineDashboardCustomize /> Dashboard</Link></li>
                    <li><Link to="/vessel-management"><MdOutlineDashboardCustomize /> Vessel Management</Link></li>
                    <li className='text-md mb-5 mt-2'><a><PiSignOutBold />Sign Out</a></li>
                </ul>
            </div>
        </div >
    );
};

export default Dashboard;