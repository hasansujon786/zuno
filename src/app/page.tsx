"use client";

import { Footer } from "./components/Footer";
import StackSlider from "./components/StackSlider";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main>
        <div className="p-8 pb-20 sm:p-20">
          <h1>hero title</h1>
        </div>

        <StackSlider />
      </main>

      <Footer />
    </div>
  );
}
