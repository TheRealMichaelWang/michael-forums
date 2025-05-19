//This is the reusable component that handles navigation and exposes the login/singup interface
import React from 'react';
import { Link } from 'react-router-dom'; //better use link than href
import { SignedIn, SignedOut, UserButton, SignInButton, SignOutButton, SignUpButton } from '@clerk/clerk-react';

const Header: React.FC = () => {
    return (
    <header>
        <nav>
            <Link to="/">Home</Link>
        </nav>
        <div>
            <SignedIn>
                <UserButton>
                    <button>Profile</button>
                </UserButton>
                <SignOutButton>
                    <button>Log Out</button>
                </SignOutButton>
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <button>Log In</button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <button>Sign Up</button>
                </SignUpButton>
            </SignedOut>
        </div>
    </header>
    );
}

export default Header;