import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between bg-slate-500 text-white p-3">
      <div>
        <span className="font-bold text-xl mx-8">Todo</span>
      </div>
      <ul className="flex gap-8 mx-9 font-semibold">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
      </ul>
    </nav>
  );
}
