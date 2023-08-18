"use client"
import CreatePdf from '@/components/CreatePdf';
import Searchbar from '@/components/Searchbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const api = process.env.API_ENDPOINT;

    useEffect(() => {
        loaduser();
    }, [])

    const loaduser = (async () => {
        const res = await axios.get(api + "user").then(res => {
            setUsers(res.data)
        })

    })

    const handleSearch = async (e) => {
        const prop = e.target.value;
        setQuery(prop)
    }

    const handleDelete = async (userId) => {
        Swal.fire({
            title: 'ต้องการลบผู้ใช้หรือไม่',
            icon: 'warning',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                axios.delete(api + "user/" + userId).then(res => {
                    loaduser();
                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                    )
                })
            }
        })

    }

    const totalname = async (name, lame) => {
        const fullname = name + lame
        return fullname
    }

    return (
        <>
            <form>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input onChange={handleSearch} value={query} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <div className='flex'>
                <CreatePdf
                    name={"ผู้ใช้"}
                    headers={["ชื่อ", "นามสกุล", "บ้าน", "หมู่", "ตำบล", "จังหวัด"]}
                    data={users.map(({ name, lname, ban, moo, tumbon, province }) => { return [name, lname, ban, moo, tumbon, province] })}
                />

            </div>

            {/* <CreatePdf
                name={"ผู้ใช้"}
                headers={["ชื่อ","นามสกุล","บ้าน","หมู่","ตำบล","จังหวัด"]}
                data={users.map(({})=>{return[]})}
            /> */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อ</th>
                            <th>นามสกุล</th>
                            <th>บัตร ปปช</th>
                            <th>วันเกิด</th>
                            <th>เบอร์</th>
                            <th>เมล์</th>
                            <th>ที่อยู่</th>
                            <th>ชื่อผู้ใช้</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {users.map((user, idx) => {
                            const isMatch = user.name.toLowerCase().includes(query.toLowerCase()) ||
                                user.lname.toLowerCase().includes(query.toLowerCase()) ||
                                user.ban.toLowerCase().includes(query.toLowerCase())

                            if (!isMatch) {
                                return null;
                            }

                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{(user.name + user.name)}</td>
                                    <td>{user.lname} </td>
                                    <td>{user.card}</td>
                                    <td>{user.birthday}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.mail}</td>
                                    <td>{user.ban},{user.moo},{user.tumbon},{user.aumper},{user.province}</td>
                                    <td>{user.username}</td>
                                    <td className='space-x-2 flex'>
                                        <button
                                            className="btn btn-error"
                                            onClick={() => handleDelete(user.userId)}
                                        >ลบ
                                        </button>

                                        <a
                                            href={"/profile/" + user.userId}
                                            className="btn btn-outline btn-secondary"

                                        >แก้ไข
                                        </a>
                                    </td>
                                </tr>
                            )

                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Admin