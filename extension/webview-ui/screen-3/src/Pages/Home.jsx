import React, { useEffect, useState, useRef } from 'react'
import Card from '../components/Card'


const Home = () => {
    const vscode = useRef(null)
    const [data, setData] = useState([])

    if (vscode.current === null) {
        vscode.current = acquireVsCodeApi()
    }
    const fetchArticles = async (languagesJoined) => {
        try {
            const response = await fetch(`https://dev.to/api/articles?per_page=50&tags=${languagesJoined}&state=fresh`)
            const data = await response.json()
            console.log(data)
            setData(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        window.addEventListener('message', event => {
            const message = event.data
            switch (message.command) {
                case 'choosenLanguage':
                    let arr = message.data
                    let languagesJoined = ""
                    arr.forEach((el) => {
                        languagesJoined += el.toLowerCase() + ", "
                    })
                    fetchArticles(languagesJoined)
                    break
            }
        })
        vscode?.current.postMessage({ command: 'ready' })
    }, [])

    return (
        <div className='flex flex-col gap-4 w-full items-center p-4'>
            {
                data && data.map((el) => (
                    <Card key={el.id} vscode={vscode} title={el.title} url={el.url} cover_image={el.cover_image} tag_list={el.tag_list} user={el.user} />
                ))
            }
        </div>
    )
}

export default Home