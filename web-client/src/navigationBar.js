import { Link, useMatch, useResolvedPath } from "react-router-dom";

function NavBar() {
  return (
  <nav className="nav">
    <Link to="/" className="site-title">
      EmployMe
    </Link>
    <ul>
        <CustomLink to="/sign-up">Sign Up</CustomLink>
        <CustomLink to="/sign-in">Sign In</CustomLink>
    </ul>
    </nav>
  )
}

function CustomLink({to, children, ...props }) {
  
  const isActive = useMatch({ path: useResolvedPath(to).pathname,end: true});

  return (
    <li classname={isActive ? "active" : ""}>
    <Link to={to} {...props}>
      {children}
    </Link>
    </li>
  )
}

export default NavBar;