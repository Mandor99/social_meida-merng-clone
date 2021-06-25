import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { getPosts } from '../graphQl/Query';
import Post from './Post'

function Posts() {
	const { loading, data } = useQuery(getPosts);
	if (loading) return <p className='loadingTxt'>loading posts ...</p>;
	if (data) console.log(data);
	return (
		<div>
			<Grid columns={3}>
				<Grid.Row>
					<h2 className='headTitle'>Recent Posts</h2>
				</Grid.Row>
				<Grid.Row>
					{
						data && data.getPosts.map((post) => (
                            <Grid.Column key={post.id}>
                                <Post post={post}/>
								{/* <h3>{post.username}</h3> */}
                            </Grid.Column>
                        ))
					}
				</Grid.Row>
			</Grid>
		</div>
	);
}

export default Posts;
