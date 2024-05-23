import React from 'react';
import './Header.css'; // Stilizacija za header

const Header = () => {
    // State za prikazivanje/isključivanje padajućeg menija
    const [showDropdown, setShowDropdown] = React.useState(false);

    // Funkcija za prikazivanje/isključivanje padajućeg menija
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="header">
            <div className="logo">
                <img src="/putanja/do/loga.png" alt="Logo" />
            </div>
            <div className="dropdown-menu">
                {/* Padajući meni - prikazuje se ako showDropdown === true */}
                {showDropdown && (
                    <ul>
                        <li>Opcija 1</li>
                        <li>Opcija 2</li>
                        <li>Opcija 3</li>
                    </ul>
                )}
            </div>
            {/* Dugme za prikazivanje/isključivanje padajućeg menija */}
            <button onClick={toggleDropdown}>Padajući meni</button>
        </div>
    );
};

export default Header;
