/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0B1120',
                surface: '#1E293B',
                primary: '#3B82F6',
                primaryHover: '#2563EB',
                secondary: '#64748B',
                accent: '#06B6D4',
                success: '#10B981',
                danger: '#EF4444',
            }
        },
    },
    plugins: [],
}
