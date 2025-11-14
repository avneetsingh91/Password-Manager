import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", password: "", username: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        try {
            let passwords = localStorage.getItem("passwords");
            if (passwords) {
                setpasswordArray(JSON.parse(passwords));
            }
        } catch (err) {
            console.error("Invalid data in localStorage:", err);
            localStorage.removeItem("passwords");
        }
    }, []);


    const showPassword = () => {

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordref.current.type = "password"

        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordref.current.type = "text"

        }
    }

    const savePassword = () => {

        setpasswordArray([...passwordArray, {...form, "id": uuidv4()}]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, "id": uuidv4()}]))
        setform({ site: "", password: "", username: "" })

    }

      const deletePassword = (id) => {

        let c = confirm("Do you want to delete?")

        if(c){
            setpasswordArray(passwordArray.filter(item=>item.id!=id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!=id)))
            console.log(passwordArray)

        }

    }

     const editPassword = (id) => {
        setform(passwordArray.filter(i=>i.id===id)[0])       
        setpasswordArray(passwordArray.filter(item=>item.id!=id));

    }

    const handleChange = (e) => {

        setform({ ...form, [e.target.name]: e.target.value })

    }

    const copytext = (text) => {

        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    }


    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />

            {/* backgound */}
            <div className="absolute top-0 -z-10 h-full w-full bg-white"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(179,155,208,0.5)] opacity-50 blur-[50px]"></div></div>

            {/* conatiner */}
            <div className="container mt-5 mx-auto flex flex-col items-center max-w-[900px]">
                <h1 className='text-2xl font-bold'>Passcode Manager </h1>
                <p>save your own passwords</p>
                {/* Inputs */}

                <div className="flex flex-col p-4 gap-4 w-full">
                    <input type="text" value={form.site} name='site' onChange={handleChange} placeholder='Enter website url' className='bg-white px-1 rounded-full border border-purple-900 w-full p-1' />

                    <div className="inputs flex gap-3">
                        <input type="text" value={form.username} name='username' onChange={handleChange} placeholder='Enter Username' className='bg-white w-full px-1 rounded-full border border-purple-900 p-1' />

                        <div className="relative w-full">
                            <input ref={passwordref} type="password" value={form.password} name='password' onChange={handleChange} placeholder='Enter password' className='bg-white w-full px-1 rounded-full border border-purple-900 p-1' />

                            <span onClick={showPassword} className='absolute right-2 top-1.5'><img ref={ref} src="./icons/eye.png" width={23} alt="" /></span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex gap-1 items-center mx-auto font-bold border border-purple-950 w-fit rounded-full p-2 bg-purple-100 hover:bg-purple-300'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save it</button>
                </div>

                <div className="passwords w-full">

                    {passwordArray.length === 0 && <div>No passwords to show </div>}
                    <h1 className='text-xl font-bold py-2'>Your Passwords</h1>
                    {passwordArray.length != 0 && <table className="table-auto w-full" >
                        <thead className='bg-purple-400 font-bold text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-purple-100'>
                            {passwordArray.map((item, index) => {

                                return <tr key={index}>
                                    <td className='text-center py-2 '>
                                        <div className="flex justify-center items-center">
                                            {item.site}
                                            <div className="lordiconcopy flex justify-center items-center" onClick={() => {
                                                copytext(item.site)
                                            }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "paddingTop": "1px", "paddingLeft": "3px" }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 '>

                                        <div className="flex justify-center items-center">
                                            <span>{item.username}</span>
                                            <div className="lordiconcopy flex justify-center items-center" onClick={() => {
                                                copytext(item.username)
                                            }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "paddingTop": "1px", "paddingLeft": "3px" }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='text-center py-2 '>
                                        <div className="flex justify-center items-center">
                                            {item.password}
                                            <div className="lordiconcopy flex justify-center items-center" onClick={() => {
                                                copytext(item.password)
                                            }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "paddingTop": "1px", "paddingLeft": "3px" }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    {/* actions */}
                                    <td className='text-center py-2 '>
                                        <span onClick={()=>{deletePassword(item.id)}}>
                                        <lord-icon
                                       
                                            src="https://cdn.lordicon.com/jzinekkv.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon>
                                        </span>

                                        <span onClick={()=>{editPassword(item.id)}}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/exymduqj.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon>

                                        </span>

                                    </td>
                                </tr>

                            })}


                        </tbody>
                    </table>
                    }

                </div>

            </div>
        </>
    )
}

export default Manager
