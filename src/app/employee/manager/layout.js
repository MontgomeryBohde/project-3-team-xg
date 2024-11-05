export const metadata = {
    title: 'Manager Home',
    description: 'Manager Home page to navigate to other pages',
}

export default function RootLayout({ children }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    )
}