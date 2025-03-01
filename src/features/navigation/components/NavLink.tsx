import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { MenuItem } from '../types';

interface NavLinkProps {
  item: MenuItem;
  onNavClick: (href: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onNavClick }) => {
  const { t } = useTranslation('common');

  if (item.isExact) {
    return (
      <Link
        to={item.href}
        className="nav-link"
        onClick={() => onNavClick(item.href)}
        {...(item.isNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {t(item.title)}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      className="nav-link"
      onClick={() => onNavClick(item.href)}
    >
      {t(item.title)}
    </a>
  );
};

export default NavLink;