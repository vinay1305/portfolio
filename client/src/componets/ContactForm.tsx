"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            // Validation
            if (!form.name || !form.email || !form.message) {
                return toast.error("All fields are required ❗");
            }

            if (!form.email.includes("@")) {
                return toast.error("Enter a valid email ❌");
            }

            setLoading(true);

            const res = await fetch("http://localhost:5000/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Message sent successfully 🚀");
                setForm({ name: "", email: "", message: "" });
            } else {
                toast.error(data.message);
            }

        } catch (err) {
            toast.error("Something went wrong ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-2xl mx-auto mt-20">
            <form
                onSubmit={handleSubmit}
                className="glass p-8 rounded-2xl shadow-lg"
            >
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                    Contact Me
                </h2>

                <div className="flex flex-col gap-4">
                    <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your Name"
                        className="p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-green-400 transition"
                    />

                    <input
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Your Email"
                        className="p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-green-400 transition"
                    />

                    <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Your Message"
                        rows={4}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-green-400 transition"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 hover:shadow-lg transition"
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </section>
    );
}