import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Howl } from "howler";

// ─── Apple Emoji via CDN ────────────────────────────────────────
const APPLE_EMOJI_MAP = {
  "😭": "1f62d",
  "😢": "1f622",
  "😩": "1f629",
  "😔": "1f614",
  "💔": "1f494",
  "😏": "1f60f",
  "❤️": "2764-fe0f",
  "💖": "1f496",
  "🥺": "1f97a",
};

function AppleEmoji({ emoji, size = 24 }) {
  const cp = APPLE_EMOJI_MAP[emoji];
  if (!cp) return <span>{emoji}</span>;

  return (
    <img
      src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple@15.0.0/img/apple/64/${cp}.png`}
      alt={emoji}
      width={size}
      height={size}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  );
}

// ─── GIFs (WebP + width=320 for speed) ─────────────────────────
const introGif =
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnZmNGJ6eXh3Mzc5MDF6cXVoYzFta2k3dWI0ajNkaXV3cmt6cGVkMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/901mxGLGQN2PyCQpoc/giphy.webp?width=320";

const yesGif =
  "https://media.giphy.com/media/9AIzFvMX8cfRJBUzWc/giphy.webp?width=320";

const noGifs = [
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXVuenp4Z2U1MnY3aGlxZDd5OGdieXZ5czJyMTEwNmo5dWswZ3Z1ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dCwNmR9BBOzKpiBQOs/giphy.webp?width=320",
  "https://media.giphy.com/media/98MaHVwJOmWMz4cz1K/giphy.webp?width=320",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZWxsODE3YnN3NWpjaWowNGM2cW00MGg4eHluN2IzazE4NWRneDc1cyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/10tIjpzIu8fe0/giphy.webp?width=320",
  "https://media.giphy.com/media/zIZldEXyyo64qOIgvb/giphy.webp?width=320",
  "https://media.giphy.com/media/FTXHBKqNYRxXLBS0g0/giphy.webp?width=320",
];

// ─── Preload all GIFs on mount so they're cached and ready ─────
const ALL_GIFS = [introGif, yesGif, ...noGifs];

// ─── NO stage messages ──────────────────────────────────────────
const noMessages = [
  { text: "That hurt… but I still choose you", emoji: "😭" },
  { text: "Mummy Pleaseeeeeeeeeee", emoji: "🥺" },
  { text: "Don't do thisss", emoji: "😔" },
  { text: "Why you dey feel like Merlin", emoji: "😏" },
  { text: "Say Yesssss", emoji: "😩" },
];

// ─── Backgrounds ────────────────────────────────────────────────
const introBg =
  "bg-gradient-to-br from-pink-200 via-pink-100 to-red-200 text-red-700";
const yesBg =
  "bg-gradient-to-br from-pink-300 via-pink-200 to-red-200 text-red-700";

const noBgStages = [
  "bg-gradient-to-br from-black via-red-900 to-black text-white",
  "bg-gradient-to-br from-gray-900 via-red-800 to-black text-white",
  "bg-gradient-to-br from-gray-800 via-red-700 to-gray-900 text-white",
  "bg-gradient-to-br from-gray-700 via-red-600 to-gray-800 text-white",
  "bg-gradient-to-br from-gray-500 via-red-500 to-gray-700 text-white",
];

// ─── Pick the right GIF based on state ──────────────────────────
function getCurrentGif(answer, noClickCount) {
  if (!answer) return introGif;
  if (answer === "YES") return yesGif;
  return noClickCount > 0 && noClickCount <= 5
    ? noGifs[noClickCount - 1]
    : noGifs[0];
}

// ─── Pick the right background based on state ──────────────────
function getCurrentBg(answer, noClickCount) {
  if (answer === "YES") return yesBg;
  if (answer === "NO" && noClickCount > 0 && noClickCount <= 5)
    return noBgStages[noClickCount - 1];
  return introBg;
}
const NewProp = () => {
  const [answer, setAnswer] = useState(null);
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [noClickCount, setNoClickCount] = useState(0);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const NO_SHRINK_STEP = 0.15;
  const YES_GROW_STEP = 0.18;
  const MAX_NO_CLICKS = 5;

  // ── Preload all GIFs silently in the background on mount ────
  useEffect(() => {
    ALL_GIFS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const resize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleNo = () => {
    setNoClickCount((prev) => prev + 1);
    setYesScale((s) => s + YES_GROW_STEP);
    setNoScale((s) => Math.max(s - NO_SHRINK_STEP, 0));
    setAnswer("NO");
  };

  const handleYes = () => {
    setAnswer("YES");
  };

  const currentNo =
    noClickCount > 0 && noClickCount <= MAX_NO_CLICKS
      ? noMessages[noClickCount - 1]
      : null;

  const renderHeading = () => {
    if (answer === "YES") {
      return (
        <div>
          Yay! You just made my heart explode, Ife mi <AppleEmoji emoji="❤️" size={36} />
        </div>
      );
    }
    if (answer === "NO" && currentNo) {
      return (
        <>
          {currentNo.text} <AppleEmoji emoji={currentNo.emoji} size={36} />
        </>
      );
    }
    return (
      <div>
        Shikemi, will you be my Valentine? <AppleEmoji emoji="🥺" size={36} />
      </div>
    );
  };
  return (
    <div
      className={`w-screen h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${getCurrentBg(answer, noClickCount)}`}
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
        <motion.img
          key={getCurrentGif(answer, noClickCount)}
          src={getCurrentGif(answer, noClickCount)}
          alt="emotion"
          className="mx-auto w-80 h-80 rounded-3xl object-cover shadow-2xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* TEXT */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold"
          animate={answer === "NO" ? { x: [0, -8, 8, -8, 8, 0] } : {}}
        >
          {renderHeading()}
        </motion.h1>

        {/* BUTTONS */}
        {answer !== "YES" && (
          <div className="flex justify-center items-center gap-8">
            {/* YES */}
            <motion.button
              onClick={handleYes}
              className="bg-red-500 text-white cursor-pointer px-10 py-4 rounded-xl font-bold shadow-xl inline-flex items-center gap-2"
              animate={{ scale: yesScale }}
              whileHover={{ scale: yesScale + 0.1 }}
            >
              YES! <AppleEmoji emoji="💖" size={24} />
            </motion.button>

            {/* NO */}
            <AnimatePresence>
              {noClickCount < MAX_NO_CLICKS && (
                <motion.button
                  onClick={handleNo}
                  className="bg-black text-white px-10 cursor-pointer py-4 rounded-xl font-bold shadow-xl inline-flex items-center gap-2"
                  animate={{ scale: noScale, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.2 }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                >
                  NO <AppleEmoji emoji="💔" size={24} />
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
