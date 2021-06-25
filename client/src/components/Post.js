import React from 'react';
import {Button, Card, Image, Icon, Label} from 'semantic-ui-react'
import moment from 'moment'
import {Link} from 'react-router-dom'

function Post({post: {id, username, createdAt, likesCount, commentsCount, body} }) {
    return(
        // <h2>{body}</h2>
    <Card.Group className='postCard'>
        <Card fluid>
            
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          circular
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description as={Link} to={`/posts/${id}`}>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
        <Button as='div' labelPosition='right' className='mr'>
            <Button color='teal' basic>
                <Icon name='heart' />
            </Button>
            <Label basic color='teal' pointing='left'>
                {likesCount}
            </Label>
        </Button>
        <Button as='div' labelPosition='left' className='ml'>
            <Button color='blue' basic>
                <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left'>
                {commentsCount}
            </Label>
        </Button>
        </div>
      </Card.Content>
    </Card>
    </Card.Group>
    
    )
}

export default Post;
