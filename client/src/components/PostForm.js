import {useMutation} from '@apollo/client'
import React, {useState, useEffect} from 'react'
import {Form, Button, Message} from 'semantic-ui-react'
import {createPostMutation, getPosts} from '../graphQl/Query'

function PostForm() {
    const [post, setPost] = useState('')
    const [err, setErr] = useState({})
    const [createPost, {error}] = useMutation(createPostMutation, {
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
        onError({graphQLErrors}) {
            setErr(graphQLErrors[0])
            console.log(err);
        }
        // refetchQueries: [{query: getPosts}] ==>> it's true but i would to use cache update
    })
    // useEffect(() => {
    //     return createPost({variables: {body: post}})
    // }, [createPost, post])
    const handleInput = (setter) => (e) => setter(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        createPost({variables: {body: post}})
        setPost('')
    }
    return (
        <div className='w-60-center'>
            <h3>What's in your mind: </h3>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='I think in ...' type='text' value={post} onChange={handleInput(setPost)} error={error ? true : false}/>
                <Button type='submit' color='teal'> Share Post </Button>
            </Form>
            {
                error && (<Message error header={err?.message?.slice(15)} />)
            }
        </div>
    )
}

export default PostForm
