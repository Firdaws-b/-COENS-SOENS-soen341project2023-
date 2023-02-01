import { Link } from "react-router-dom";

function NavBar() {
  return (<nav className="nav">
    <Link to="/" className="site-title">EmployMe</Link>
    <ul>
      <li className="active">
        <CustomLink to="/sign-up">Sign Up</CustomLink>
        </li>
        <li>
        <CustomLink to="/sign-in">Sign In</CustomLink>
      </li>
    </ul>
    </nav>
  )
}

function CustomLink({to, children, ...props }) {
  const path = window.location.pathname

  return (
    <li classname={path === to ? "active" : ""}>
    <Link to={to} {...props}>
      {children}
    </Link>
    </li>
  )
}

export default NavBar;