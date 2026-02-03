import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Howl } from "howler";

// 🎥 Realistic GIFs
const yesGif = "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif";
const noGif = "https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif";

// 🔊 Sounds
const yesSound = new Howl({
  src: ["https://freesound.org/data/previews/331/331912_3248244-lq.mp3"],
});
const noSound = new Howl({
  src: ["https://freesound.org/data/previews/256/256113_3263906-lq.mp3"],
});

const NewProp = () => {
  const [answer, setAnswer] = useState(null);
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 👇 edit this to control when NO disappears
  const NO_VANISH_SCALE = 0.15;

  useEffect(() => {
    const resize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleNo = () => {
    noSound.play();
    setAnswer("NO");
    setYesScale((s) => s + 0.25); // YES grows
    setNoScale((s) => Math.max(s - 0.2, 0)); // NO shrinks
  };

  const handleYes = () => {
    yesSound.play();
    setAnswer("YES");
  };

  return (
    <div
      className={`w-screen h-screen flex items-center justify-center overflow-hidden transition-all duration-700
      ${
        answer === "NO"
          ? "bg-gradient-to-br from-black via-red-900 to-black text-white"
          : "bg-gradient-to-br from-pink-200 via-pink-100 to-red-200 text-red-700"
      }`}
    >
      {answer === "YES" && (
        <Confetti
          width={size.width}
          height={size.height}
          numberOfPieces={250}
        />
      )}

      <div className="text-center space-y-8">
        {/* GIF */}
        {answer && (
          <motion.img
            src={answer === "YES" ? yesGif : noGif}
            alt="emotion"
            className="mx-auto w-80 h-80 rounded-3xl object-cover shadow-2xl"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}

        {/* TEXT */}
        <motion.h1
          className="text-4xl font-bold"
          animate={answer === "NO" ? { x: [0, -8, 8, -8, 8, 0] } : {}}
        >
          {answer === "YES"
            ? "Ifemi you just made my heart explode ❤️"
            : answer === "NO"
              ? "That hurt… but I still choose you 😭"
              : "Will you be my Valentine?"}
        </motion.h1>

        {/* BUTTONS */}
        {answer !== "YES" && (
          <div className="flex justify-center gap-10">
            {/* YES */}
            <motion.button
              onClick={handleYes}
              className="bg-red-500 text-white px-10 py-4 rounded-xl font-bold shadow-xl mt-5"
              animate={{ scale: yesScale }}
              whileHover={{ scale: yesScale + 0.1 }}
            >
              YES 💖
            </motion.button>

            {/* NO */}
            <AnimatePresence>
              {noScale > NO_VANISH_SCALE && (
                <motion.button
                  onClick={handleNo}
                  className="bg-black text-white px-10 py-4 rounded-xl font-bold mt-5 shadow-xl"
                  animate={{ scale: noScale, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.2 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  NO 💔
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProp;
