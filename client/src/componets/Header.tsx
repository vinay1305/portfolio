"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [active, setActive] = useState("home");

    const navItems = [
        { name: "Home", href: "#" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

                {/* Logo */}
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                    Vinay.dev
                </h1>
                {/* Nav */}
                <nav className="flex gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setActive(item.name.toLowerCase())}
                            className={`relative transition ${active === item.name.toLowerCase()
                                    ? "text-white"
                                    : "text-gray-400"
                                } hover:text-white`}
                        >
                            {item.name}

                            {/* underline animation */}
                            <span
                                className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ${active === item.name.toLowerCase()
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                    }`}
                            />
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}