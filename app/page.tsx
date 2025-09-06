"use client";
import StarField from "@/components/starFeild";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { RedirectToSignIn } from "@clerk/nextjs";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function Home() {
  return (
    <div className="h-screen  bg-black flex flex-col justify-center items-center relative overflow-hidden">
      <StarField />
      <TopBar />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center bg-transparent backdrop-blur-xl p-10 rounded-full z-10"
      >
        <motion.h1
          variants={item}
          className="font-bold text-white text-4xl md:text-6xl drop-shadow-[0_0_10px_rgba(138,180,248,0.3)]"
        >
          Launch Your<br />Second Brain into Space.
        </motion.h1>

        <motion.p
          variants={item}
          className="text-[#A0AEC0] font-light mt-5 drop-shadow-[0_0_10px_rgba(138,180,248,0.3)]"
        >
          Beautifully organized, AI-enhanced, and made for minds that wander
          across galaxies. Capture, visualize,
          <br />
          and search your knowledge across constellations of ideas.
        </motion.p>

        <motion.div variants={item}>
          <Link href={"/sign-in"}>
          <Button className="rounded-0 mt-8 text-xl px-5 py-6 text-black hover:opacity-90 cursor-pointer hover:text-white bg-[#00e0d6]">
            Start Now
          </Button></Link>
        </motion.div>
      </motion.div>

      <motion.img
        src="/assets/nebula.png"
        alt="Nebula Notes Dashboard"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.8 }}
        className="w-[90%] max-w-6xl backdrop-blur-xl bg-white/20 border-6 mx-auto rounded-xl shadow-2xl  border-white/10 z-10"
        style={{
          position: "absolute",
          bottom: "-4rem",
          top: "80%",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}

function TopBar() {
  return (
    <div className="fixed top-0 flex items-center justify-between w-full h-20 border-b border-gray-100/20 px-4 sm:px-10 lg:px-24">
      <h2 className="text-xl sm:text-2xl text-[#00e0d6] font-bold">
        🪐Nebula Notes
      </h2>
      <div className="space-x-3 sm:space-x-6 flex">
        <SignInButton forceRedirectUrl={"/dashboard"}>
          <Button className="cursor-pointer" variant="secondary">
            Login
          </Button>
        </SignInButton>
      </div>
    </div>
  );
}