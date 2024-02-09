import React, { useEffect, useState, useRef } from 'react'
import Card from '../components/Card'


const Home = () => {
    const vscode = useRef(null)
    const [data, setData] = useState([])

    if (vscode.current === null) {
        vscode.current = acquireVsCodeApi()
    }
    const fetchArticles = async () => {
        try {
            const response = await fetch("https://dev.to/api/articles")
            const data = await response.json()
            console.log(data)
            setData(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchArticles()
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