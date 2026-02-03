import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ background: '#333', color: 'white', padding: '20px' }}>
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '20px' }}>Home</Link>
        <Link to="/cours" style={{ color: 'white', marginRight: '20px' }}>Cours</Link>
        <Link to="/tarifs" style={{ color: 'white', marginRight: '20px' }}>Tarifs</Link>
        <Link to="/contact" style={{ color: 'white', marginRight: '20px' }}>Contact</Link>
      </nav>
    </header>
  );
};

export default Header;