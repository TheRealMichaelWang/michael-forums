//This is the reusable component that handles navigation and exposes the login/singup interface
import React from 'react';
import { Link } from 'react-router-dom'; //better use link than href
import { SignedIn, SignedOut, UserButton, SignInButton, SignOutButton, SignUpButton } from '@clerk/clerk-react';

const Header: React.FC = () => {
    return (
    <header className='header'>
        <div className='header-inner'>
            <nav>
                <Link to="/" className="button-accent">Home</Link>
            </nav>
            <div className='header-actions'>
                <SignedIn>
                    <UserButton/>
                    <SignOutButton>
                        <button className="button-accent">Log Out</button>
                    </SignOutButton>
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="button-accent">Log In</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <button className="button-accent">Sign Up</button>
                    </SignUpButton>
                </SignedOut>
            </div>
        </div>
    </header>
    );
}

export default Header;