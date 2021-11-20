import React from 'react';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useRouter } from 'next/router';

const Header = () => {
    const { asPath } = useRouter();

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Link href="/" passHref>
                            <Nav.Link active={asPath === '/'}>
                                Market Overview
                            </Nav.Link>
                        </Link>
                        <Link href="/liquidity" passHref>
                            <Nav.Link active={asPath === '/liquidity'}>
                                Liquidity
                            </Nav.Link>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;