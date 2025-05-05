"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await apiFetch<{ token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-6 rounded-2xl bg-transparent">
        <h2 className="text-[32px] font-medium  text-center text-black">
          Welcome Back!
        </h2>
        <p className="text-[#444444] text-[18px] text-center">
          Sign in to continue using our services
        </p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4 mt-10">
          <div>
            <label
              htmlFor="email"
              className="block text-[18px] font-medium mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-[#EEEEEE] rounded-lg p-3"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-[18px] font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-[#EEEEEE] rounded-lg p-3"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white p-4 mt-10 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
