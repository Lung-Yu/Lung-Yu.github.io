import { Link } from 'react-router-dom';
import type { MenuItem } from '../types';

interface NavLinkProps {
  item: MenuItem;
  onNavClick: (href: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onNavClick }) => {
  if (item.isExact) {
    return (
      <Link
        to={item.href}
        className="nav-link"
        onClick={() => onNavClick(item.href)}
        {...(item.isNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      className="nav-link"
      onClick={() => onNavClick(item.href)}
    >
      {item.title}
    </a>
  );
};

export default NavLink;