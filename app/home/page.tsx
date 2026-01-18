import { Post } from '@/interfaces/post'
import Image from 'next/image'
import React from 'react'

export default async function page() {

    async function getAllPosts() {
        try {
            const response = await fetch('https://linked-posts.routemisr.com/posts?limit=50', {
                method: 'get',
                headers: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjk1ZDJiOWQxMzExZmQ3YjAzNDYwMjA5IiwiaWF0IjoxNzY4MzgzNzI4fQ.uWt87ISMt27ecZbhm_cmo3JGpM4uuTWQ404AKDCkKOE'
                }
                , cache: 'force-cache'
            })
            const data = await response.json()
            return data.posts
        } catch (error) {
            console.log(error)
        }
    }

    const posts = await getAllPosts()
    console.log(posts)

    return (
        <div className='container '>
            {
                posts?.map((post: Post) => (
                    <div className='flex items-center flex-col align-middle text-center'
                        key={post._id}>
                        {post.body && post.body}
                        {post?.image && <Image width={400} height={400} alt='test' src={post.image}>
                        </Image>}
                    </div>
                )

                )
            }
        </div>)
}
