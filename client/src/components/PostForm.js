import {useMutation} from '@apollo/client'
import React, {useState} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {createPostMutation, getPosts} from '../graphQl/Query'

function PostForm() {
    const [post, setPost] = useState('')
    const [createPost] = useMutation(createPostMutation, {
        update(cache, {data: {createPost}}) {
            const data = cache.readQuery({query: getPosts})
            cache.writeQuery({
                query: getPosts,
                data: {
                    getPosts: [ createPost, ...data.getPosts]
                }
            })
            console.log(data);
        },
        // refetchQueries: [{query: getPosts}] ==>> it's true but i would to use cache update
    })
    const handleInput = (setter) => (e) => setter(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        createPost({variables: {body: post}})
    }
    return (
        <div className='w-60-center'>
            <h3>What's in your mind: </h3>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='I think in ...' type='text' value={post} onChange={handleInput(setPost)}/>
                <Button type='submit' color='teal'> Share Post </Button>
            </Form>
        </div>
    )
}

export default PostForm
