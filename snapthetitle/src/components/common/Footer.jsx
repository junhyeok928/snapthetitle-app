const Footer = () => {
    return (
        <footer className="">
            <div className="container mx-auto py-2 px-5 flex flex-wrap flex-col sm:flex-row items-center">
                <p className="text-gray-500 text-sm text-center sm:text-left mb-2 sm:mb-0">© 2023 SnapTheTitle</p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                    <a href="https://blog.naver.com/snapthetitle" target="_blank" rel="noreferrer" className="text-gray-500">
                        <svg width="28px" height="28px" viewBox="-32 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M16 32C11.8333 32 8.125 33.5833 4.875 36.75C1.625 39.9167 0 43.6667 0 48V464C0 468.333 1.625 472.083 4.875 475.25C8.125 478.417 11.8333 480 16 480H432C436.167 480 439.875 478.417 443.125 475.25C446.375 472.083 448 468.333 448 464V48C448 43.6667 446.375 39.9167 443.125 36.75C439.875 33.5833 436.167 32 432 32H16ZM100.25 144H186.5L261.5 256V144H347.75V368H261.5L186.5 256V368H100.25V144Z"></path></svg>
                    </a>
                    <a href="https://www.instagram.com/snapthetitle/?igshid=MzRlODBiNWFlZA%3D%3D" target="_blank" rel="noreferrer" className="ml-4 text-gray-500">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-7 h-7" viewBox="0 0 24 24">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                        </svg>
                    </a>
                    <a href="https://pf.kakao.com/_HquIG" target="_blank" rel="noreferrer" className="ml-4 text-gray-500">
                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-7 h-7" viewBox="0 0 24 24">
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                    </a>
                </span>
            </div>
        </footer>
    )
}

export default Footer;