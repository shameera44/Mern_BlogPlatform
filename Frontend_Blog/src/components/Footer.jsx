
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, ArrowUp } from "lucide-react";
import { Globe } from "lucide-react";

const Footer = () => {
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-800 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid md:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-3xl font-bold">
                            Blog
                            <span className="text-orange-500">
                                Sphere
                            </span>
                        </h2>

                        <p className="mt-4 text-gray-600 dark:text-gray-400 leading-7">
                            Discover, learn, and share knowledge through
                            high-quality technical articles written by developers.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3">
                            <Link to="/">Home</Link>
                            <Link to="/about">About</Link>
                            <Link to="/myblogs">My Blogs</Link>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Resources
                        </h3>

                        <div className="flex flex-col gap-3">
                            <Link to="/create">Create Blog</Link>
                            <a href="mailto:blogsphere@gmail.com">
                                Contact
                            </a>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Follow Us
                        </h3>

                        <div className="flex gap-5 text-2xl">

                            <a
                                href="https://github.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-orange-500 transition"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="https://linkedin.com/in/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-orange-500 transition"
                            >
                                <FaLinkedin />
                            </a>

                            <a
                                href="mailto:blogsphere@gmail.com"
                                className="hover:text-orange-500 transition"
                            >
                                <Mail />
                            </a>

                        </div>
                    </div>

                    {/* Bottom */}

                    <div className="border-t dark:border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

                        <p className="text-gray-500">
                            © 2026 BlogSphere. All rights reserved.
                        </p>

                        <button
                            onClick={scrollTop}
                            className="mt-4 md:mt-0 p-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition"
                        >
                            <ArrowUp size={18} />
                        </button>

                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;