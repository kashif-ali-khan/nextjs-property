import "@/assets/styles/global.css";

export const metadata = {
    title: 'kashif next js',
    keywords: 'Next js, First learning',
    description: 'This is sample app for learning Next JS'
}
const MainLayout = ({children}) => {
    return (
        <html lang="en">
            <body>
            <main>{children}</main>
            </body>
        </html>
    )
}


export default MainLayout;
// export default function MainLayout({ children }) {
//     return (
//       <html lang="en">
//         <body>
//           <main>{children}</main>
//         </body>
//       </html>
//     );
//   }