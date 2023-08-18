//rafce
"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <div className="navbar">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
                {session?.user ? (
                    <>
                        <p>{session?.user.name}</p>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={session?.user.lname} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a
                                        href={"/profile/" + session.user.mpyId}
                                        className="justify-between">
                                        ข้อมูลส่วนตัว
                                        <span className="badge">New</span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href='/admin/home'
                                        className="justify-between">
                                        admin
                                        <span className="badge">New</span>
                                    </a>
                                </li>

                                <li><a>Settings</a></li>
                                <li onClick={() => signOut({ callbackUrl: '/', redirect: true })}><a>Logout</a></li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <button onClick={() => signIn()} className="btn btn-accent rounded-full" >ล็อคอิน</button>
                )}
            </div>
        </div>
    )
}

export default Navbar