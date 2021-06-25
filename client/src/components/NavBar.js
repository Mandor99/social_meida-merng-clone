import React, {useState} from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// MenuExampleSecondaryPointing
const NavBar = () => {
    const {pathname} = window.location
    const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
      <div>
        <Menu pointing secondary color='teal' size='massive'>

          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to='/register'
            />
             <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to='/login'
            />
          </Menu.Menu>
          
        </Menu>
      </div>
    )
  
}

export default NavBar