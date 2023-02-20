import { Link } from 'react-router-dom'
const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link to='/anecdotes' style={padding}>anecdotes</Link>
        <Link to='/create' style={padding}>create new</Link>
        <Link to='/about' style={padding}>about</Link>
        {/* <Link to='/' style={padding}>home</Link>         */}
      </div>

    )
  }

  export default Menu