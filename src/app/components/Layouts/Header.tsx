import Link from 'next/link'

const Header = () => {
    return ( <header className="grid grid-cols-3 place-items-center py-4 font-light text-sm">
        <h1 className="font-extrabold text-xl">ECOMMERCE</h1>
        <nav>
            <ul className="inline-flex gap-2">
                <li><Link href='/'>Home</Link></li>
                <li>Search</li>
                <li><Link href='/terms'>Terms</Link></li>
            </ul>
        </nav>
        <nav>
            <ul className="inline-flex gap-2">
                <li>Profile</li>
                <li>Cart</li>
            </ul>
        </nav>
    </header> );
}
 
export default Header;