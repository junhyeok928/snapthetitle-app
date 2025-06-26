module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Apple SD Gothic Neo', 'Helvetica', 'Arial', 'sans-serif'], // CustomFont는 폰트 패밀리 이름
            },},
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1750px',
            // => @media (min-width: 1750px) { ... }
        },
    },
    plugins: [require("tailwindcss-safe-area")],
};