import React from 'react'

const Card = ({ title, url, cover_image, tag_list, user, vscode }) => {

    const clickHandler = async (url) => {
        try {
            const response = await fetch(url)
            const data = await response.text()
            vscode?.current.postMessage({
                command: "openLink",
                data: {
                    data,
                    title
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="card ring w-1/2 bg-base-100 shadow-xl cursor-pointer" >
            <figure onClick={() => clickHandler(url)}><img src={cover_image} /></figure>
            <div className="w-full p-4">
                <div className='flex w-full justify-between'>
                    <h2 onClick={() => clickHandler(url)} className="text-2xl font-bold mt-2 w-[90%] truncate">{title}</h2>
                    <details className="dropdown">
                        <summary className="m-1 btn">Tags</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            {
                                tag_list && tag_list.map((el) => (
                                    <li><a>{el}</a></li>
                                ))
                            }
                        </ul>
                    </details>
                </div>
                <div className='flex gap-4'>
                    <div className="avatar flex gap-4 items-center">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.profile_image} />
                        </div>
                        <p className='font-semibold'>{user?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card