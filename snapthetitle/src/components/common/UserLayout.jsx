import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function UserLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 bg-white py-5">
                <div className="mx-auto w-full sm:w-3/4 lg:w-2/4">
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
}
