import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const [isNoticeDropdownOpen, setIsNoticeDropdownOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        const isNoticePath = ['/notice/faq', '/notice/partner', '/notice/guide'].includes(location.pathname);
        if (path === '/notice' && isNoticePath) {
            return 'text-black font-medium border-b-2 border-black';
        }
        return location.pathname === path ? 'text-black font-medium border-b-2 border-black' : 'text-gray-600';
    };

    const handleMenuItemClick = () => {
        setMenuToggle(false);
    };

    const handleMobileNoticeClick = () => {
        setIsNoticeDropdownOpen(!isNoticeDropdownOpen);
    };

    const handleMouseEnter = () => {
        setIsNoticeDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsNoticeDropdownOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-gray-100">
            {/* PC menu */}
            <div className="hidden md:block">
                <div className="container mx-auto px-3">
                    {/* 로고 */}
                    <div className="flex justify-center py-4 border-b border-white">
                        <Link to="/">
                            <img alt="logo" src="/logo_01.png" className="h-8 w-auto" />
                        </Link>
                    </div>
                    
                    {/* 네비게이션 */}
                    <nav className="flex justify-center items-center py-2">
                        <div className="flex space-x-10">
                            <Link className={`text-xs font-light tracking-wide transition-all duration-200 hover:text-black pb-0.5 ${isActive('/')}`} to="/">HOME</Link>
                            <Link className={`text-xs font-light tracking-wide transition-all duration-200 hover:text-black pb-0.5 ${isActive('/about')}`} to="/about">ABOUT</Link>
                            <Link className={`text-xs font-light tracking-wide transition-all duration-200 hover:text-black pb-0.5 ${isActive('/gallery')}`} to="/gallery">GALLERY</Link>
                            <Link className={`text-xs font-light tracking-wide transition-all duration-200 hover:text-black pb-0.5 ${isActive('/product')}`} to="/product">PRODUCT</Link>

                            {/* Notice 드롭다운 메뉴 */}
                            <div className="relative flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                                <button className={`text-xs font-light tracking-wide transition-all duration-200 hover:text-black pb-0.5 ${isActive('/notice')}`}>NOTICE</button>
                                {/* 드롭다운 메뉴 */}
                                <div
                                    className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg transition-all duration-200 ${
                                        isNoticeDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                    }`}
                                >
                                    <div className="py-2">
                                        <Link
                                            className="block px-4 py-2 text-xs text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-150"
                                            to="/notice/faq"
                                        >
                                            FAQ
                                        </Link>
                                        <Link
                                            className="block px-4 py-2 text-xs text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-150"
                                            to="/notice/partner"
                                        >
                                            제휴
                                        </Link>
                                        <Link
                                            className="block px-4 py-2 text-xs text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-150"
                                            to="/notice/guide"
                                        >
                                            가이드
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link className={`text-xs font-light tracking-wide transition-all duration-200 hover:text-black pb-0.5 ${isActive('/reservation')}`} to="/reservation">RESERVATION</Link>
                        </div>
                    </nav>
                </div>
            </div>

            {/* 모바일 헤더 */}
            <div className="md:hidden">
                <div className="flex items-center justify-between px-4 py-2">
                    {/* 햄버거 메뉴 버튼 */}
                    <button 
                        onClick={() => setMenuToggle(!menuToggle)}
                        className="p-2 rounded-md hover:bg-gray-50 transition-colors duration-150"
                    >
                        <div className="w-5 h-5 flex flex-col justify-center items-center">
                            <span
                                className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                                    menuToggle ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                                }`}
                            ></span>
                            <span
                                className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${
                                    menuToggle ? 'opacity-0' : 'opacity-100'
                                }`}
                            ></span>
                            <span
                                className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                                    menuToggle ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                                }`}
                            ></span>
                        </div>
                    </button>
                    
                    {/* 로고 */}
                    <Link to="/" className="flex-1 flex justify-center">
                        <img alt="logo" src="/logo_01.png" className="h-6 w-auto"/>
                    </Link>
                    
                    {/* 공간 확보용 빈 div */}
                    <div className="w-9"></div>
                </div>

                {/* 모바일 메뉴 */}
                <div
                    className={`border-t border-gray-100 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
                        menuToggle ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <nav className="py-4">
                        <Link 
                            className="block px-6 py-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-150" 
                            to="/" 
                            onClick={handleMenuItemClick}
                        >
                            HOME
                        </Link>
                        <Link 
                            className="block px-6 py-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-150" 
                            to="/about" 
                            onClick={handleMenuItemClick}
                        >
                            ABOUT
                        </Link>
                        <Link 
                            className="block px-6 py-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-150" 
                            to="/gallery" 
                            onClick={handleMenuItemClick}
                        >
                            GALLERY
                        </Link>
                        <Link 
                            className="block px-6 py-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-150" 
                            to="/product" 
                            onClick={handleMenuItemClick}
                        >
                            PRODUCT
                        </Link>

                        {/* 모바일 NOTICE 메뉴 */}
                        <div>
                            <button
                                className="flex items-center justify-between w-full px-6 py-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-150"
                                onClick={handleMobileNoticeClick}
                            >
                                NOTICE
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        isNoticeDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            <div
                                className={`bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${
                                    isNoticeDropdownOpen ? 'max-h-40' : 'max-h-0'
                                }`}
                            >
                                <Link
                                    to="/notice/faq"
                                    className="block px-10 py-2 text-sm text-gray-500 hover:text-black transition-colors duration-150"
                                    onClick={handleMenuItemClick}
                                >
                                    FAQ
                                </Link>
                                <Link
                                    to="/notice/partner"
                                    className="block px-10 py-2 text-sm text-gray-500 hover:text-black transition-colors duration-150"
                                    onClick={handleMenuItemClick}
                                >
                                    제휴
                                </Link>
                                <Link
                                    to="/notice/guide"
                                    className="block px-10 py-2 text-sm text-gray-500 hover:text-black transition-colors duration-150"
                                    onClick={handleMenuItemClick}
                                >
                                    가이드
                                </Link>
                            </div>
                        </div>

                        <Link 
                            className="block px-6 py-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors duration-150" 
                            to="/reservation" 
                            onClick={handleMenuItemClick}
                        >
                            RESERVATION
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;