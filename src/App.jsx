import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Howl } from "howler";

// ─── Apple Emoji via CDN ────────────────────────────────────────
// Uses emoji-datasource-apple images hosted on a public CDN.
// Each key is the emoji character; value is its hex codepoint.
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

console.log([..."😩"].map((c) => c.codePointAt(0).toString(16)).join("-"));

// Renders an Apple-style emoji as an <img> — always works, no library quirks.
function AppleEmoji({ emoji, size = 24 }) {
  const cp = APPLE_EMOJI_MAP[emoji];
  if (!cp) return <span>{emoji}</span>; // safe fallback to native

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

// ─── GIFs ───────────────────────────────────────────────────────
const yesGif =
  "https://media.giphy.com/media/9AIzFvMX8cfRJBUzWc/giphy.gif?cid=790b76119cf527ede9ac19499b5a485c3f3d03ab18aab937&ep=v1_user_favorites&rid=giphy.gif&ct=g";

const noGifs = [
  // "https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXVuenp4Z2U1MnY3aGlxZDd5OGdieXZ5czJyMTEwNmo5dWswZ3Z1ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dCwNmR9BBOzKpiBQOs/giphy.gif",
  "https://media.giphy.com/media/98MaHVwJOmWMz4cz1K/giphy.gif?cid=ecf05e47fb208904ce159cc9699f7861803567589e95037e&ep=v1_user_favorites&rid=giphy.gif&ct=g",
  "https://media.giphy.com/media/3o7abld9dD5j0t3aX2/giphy.gif",
  "https://media.giphy.com/media/zIZldEXyyo64qOIgvb/giphy.gif?cid=790b7611ef95b203119e174c7f8e98b6ef2f1d11f364bccd&ep=v1_user_favorites&rid=giphy.gif&ct=g",
  "https://media.giphy.com/media/FTXHBKqNYRxXLBS0g0/giphy.gif?cid=790b7611ef95b203119e174c7f8e98b6ef2f1d11f364bccd&ep=v1_user_favorites&rid=giphy.gif&ct=g",
];

// ─── Sounds ─────────────────────────────────────────────────────
const yesSound = new Howl({
  src: ["https://freesound.org/data/previews/331/331912_3248244-lq.mp3"],
});
// const noSound = new Howl({
//   src: ["https://freesound.org/data/previews/256/256113_3263906-lq.mp3"],
// });

// ─── NO stage messages ──────────────────────────────────────────
const noMessages = [
  { text: "That hurt… but I still choose you", emoji: "😭" },
  { text: "Mummy Pleaseeeeeeeeeee", emoji: "🥺" },
  { text: "You're so mean… but I forgive you", emoji: "😔" },
  { text: "Why you dey feel like Merlin", emoji: "😏" },
  { text: "Say Yesssss", emoji: "😩" },
];

// ─── Background gradients per NO stage ──────────────────────────
const bgStages = [
  "bg-gradient-to-br from-black via-red-900 to-black text-white",
  "bg-gradient-to-br from-gray-900 via-red-800 to-black text-white",
  "bg-gradient-to-br from-gray-800 via-red-700 to-gray-900 text-white",
  "bg-gradient-to-br from-gray-700 via-red-600 to-gray-800 text-white",
  "bg-gradient-to-br from-black via-black to-black text-white",
];

export default function App() {
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

  useEffect(() => {
    const resize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleNo = () => {
    // noSound.play();
    setNoClickCount((prev) => prev + 1);
    setYesScale((s) => s + YES_GROW_STEP);
    setNoScale((s) => Math.max(s - NO_SHRINK_STEP, 0));
    setAnswer("NO");
  };

  const handleYes = () => {
    yesSound.play();
    setAnswer("YES");
  };

  const currentNo =
    noClickCount > 0 && noClickCount <= MAX_NO_CLICKS
      ? noMessages[noClickCount - 1]
      : null;

  const currentNoGif =
    noClickCount > 0 && noClickCount <= MAX_NO_CLICKS
      ? noGifs[noClickCount - 1]
      : noGifs[0];

  const currentBg =
    noClickCount > 0 && noClickCount <= MAX_NO_CLICKS
      ? bgStages[noClickCount - 1]
      : answer === "NO"
        ? bgStages[0]
        : "bg-gradient-to-br from-pink-200 via-pink-100 to-red-200 text-red-700";

  // ── Heading with inline Apple emoji ─────────────────────────
  const renderHeading = () => {
    if (answer === "YES") {
      return (
        <div>
          You just made my heart explode <AppleEmoji emoji="❤️" size={36} />
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
        Eniola, will you be my Valentine?
        <AppleEmoji emoji="🥺" size={36} />
      </div>
    );
  };

  return (
    <div
      className={`w-screen h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${currentBg}`}
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
            src={answer === "YES" ? yesGif : currentNoGif}
            alt="emotion"
            className="mx-auto w-80 h-80 rounded-3xl object-cover shadow-2xl"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}

        {/* TEXT */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold "
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
}
