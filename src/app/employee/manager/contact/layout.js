export const metadata = {
    title: 'Contact for Maintenance',
    description: 'Contact form to email maintenance for request or bug report',
}

export default function RootLayout({ children }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    )
}