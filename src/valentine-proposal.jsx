import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import love from "./img/1.png";
import love2 from "./img/2.png";
// Confetti Component
const Confetti = () => {
  const pieces = Array.from({ length: 100 });

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x:
              typeof window !== "undefined"
                ? Math.random() * window.innerWidth
                : 0,
            y: -20,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
            rotate: Math.random() * 720 - 360,
            x:
              typeof window !== "undefined"
                ? Math.random() * window.innerWidth -
                  window.innerWidth / 2 +
                  Math.random() * window.innerWidth
                : 0,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "easeIn",
            delay: Math.random() * 0.5,
          }}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: [
              "#ff1744",
              "#ff4081",
              "#e91e63",
              "#f50057",
              "#ff6090",
            ][Math.floor(Math.random() * 5)],
          }}
        />
      ))}
    </div>
  );
};

// Floating Hearts Component
const FloatingHearts = () => {
  const hearts = Array.from({ length: 30 });

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x:
              typeof window !== "undefined"
                ? Math.random() * window.innerWidth
                : 0,
            y: typeof window !== "undefined" ? window.innerHeight + 50 : 1000,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            y: -100,
            scale: [0, 1.5, 1],
            rotate: Math.random() * 360,
            x:
              typeof window !== "undefined"
                ? Math.random() * window.innerWidth -
                  window.innerWidth / 2 +
                  Math.random() * window.innerWidth
                : 0,
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            ease: "easeOut",
            delay: Math.random() * 1,
          }}
          className="absolute text-5xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

// Cute Kittens Easter Egg
const KittenExplosion = () => {
  const kittens = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {kittens.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: typeof window !== "undefined" ? window.innerWidth / 2 : 400,
            y: typeof window !== "undefined" ? window.innerHeight / 2 : 300,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            x:
              typeof window !== "undefined"
                ? Math.random() * window.innerWidth
                : Math.random() * 800,
            y:
              typeof window !== "undefined"
                ? Math.random() * window.innerHeight
                : Math.random() * 600,
            scale: [0, 1.5, 1],
            rotate: Math.random() * 720 - 360,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: i * 0.05,
          }}
          className="absolute text-6xl"
        ></motion.div>
      ))}
    </div>
  );
};

export default function ValentineProposal() {
  const [answered, setAnswered] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [showKittens, setShowKittens] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [flashBackground, setFlashBackground] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const audioRef = useRef(null);
  const bgMusicRef = useRef(null);

  // useEffect(() => {
  //   // Background music
  //   bgMusicRef.current = new Audio(
  //     "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGneLyvmwhBTGH0fPTgjMGHm7A7+OZUQ8MSKzn77BdGgo9mNzyvWglBSuBzvLaiTcIGWi77+efTRAMUKfj8LZjHAY4ktfzzHksBSR3x/DdkEAKFF606+uoVRQKRp3i8r5sIQUxh9Hz04IzBh5uwO/jmVEPDEis5++wXRoKPZjc8r1oJQUrgc7y2ok3CBlou+/nn00QDFCn4/C2YxwGOJLX88x5LAUkd8fw3ZBBChVetOvrqFUUCkad4vK+bCEFMYfR89OCMwYebrzt4plRDwxIrOfvsF0aCj2Y3PK9aCUFK4HO8tqJNwgZaLvt559NEAxQp+PwtmMcBjiS1/PMeSwFJHfH8N2QQAoUXrTr66hVFApGneLyvmwhBTGH0fPTgjMGHm7A7+OZUQ8MSKzn77BdGgo9mNzyvWglBSuBzvLaiTcIGWi77+efTRAMUKfj8LZjHAY4ktfzzHksBSR3x/DdkEAKFF606+uoVRQKRp3i8r5sIQUxh9Hz04IzBh5uwO/jmVEPDEis5++wXRoKPZjc8r1oJQUrgc7y2ok3CBlou+3nn00QDFCn4/C2YxwGOJLX88x5LAUkd8fw3ZBBChVetOvrqFUUCkad4vK+bCEFMYfR89OCMwYebrzt4plRDwxIrOfvsF0aCj2Y3PK9aCUFK4HO8tqJNwgZaLvt559NEAxQp+PwtmMcBjiS1/PMeSwFJHfH8N2QQAoUXrTr66hVFApGneLyvmwhBTGH0fPTgjMGHm7A7+OZUQ8MSKzn77BdGgo9mNzyvWglBSuBzvLaiTcIGWi77+efTRAMUKfj8LZjHAY4ktfzzHksBSR3x/DdkEAKFF606+uoVRQKRp3i8r5sIQUxh9Hz04IzBh5uwO/jmVEPDEis5++wXRoKPZjc8r1oJQUrgc7y2ok3CBlou+3nn00QDFCn4/C2YxwGOJLX88x5LAUkd8fw3ZBBChVetOvrqFUUCkad4vK+bCEFMYfR89OCMwYebrzt4plRDwxIrOfvsF0aCj2Y3PK9aCUFK4HO8tqJNwgZaLvt559NEAxQp+PwtmMcBjiS1/PMeSwFJHfH8N2QQAoUXrTr66hVFApGneLyvmwhBTGH0fPTgjMGHm7A7+OZUQ8MSKzn77BdGgo9mNzyvWglBSuBzvLaiTcIGWi77+efTRAMUKfj8LZjHAY4ktfzzHksBSR3x/DdkEAKFF606+uoVRQKRp3i8r5sIQUxh9Hz04IzBh5uwO/jmVEPDEis5++wXRoKPQ==",
  //   );
  //   bgMusicRef.current.loop = true;
  //   bgMusicRef.current.volume = 0.3;
  //   bgMusicRef.current.play().catch(() => {});

  //   return () => {
  //     if (bgMusicRef.current) {
  //       bgMusicRef.current.pause();
  //     }
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //     }
  //   };
  // }, []);

  const handleYes = () => {
    setAnswered(true);
    setSaidYes(true);
    // if (bgMusicRef.current) {
    //   bgMusicRef.current.pause();
    // }
  };

  const handleNo = () => {
    setNoAttempts((prev) => prev + 1);

    // Play dramatic thunder sound
    // if (audioRef.current) {
    //   audioRef.current.pause();
    //   audioRef.current.currentTime = 0;
    // }
    // audioRef.current = new Audio(
    //   "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGneLyvmwhBTGH0fPTgjMGHm7A7+OZUQ8MSKzn77BdGgo9mNzyvWglBSuBzvLaiTcIGWi77+efTRAMUKfj8LZjHAY4ktfzzHksBSR3x/DdkEAKFF606+uoVRQKRp3i8r5sIQUxh9Hz04IzBh5uwO/jmVEPDEis5++wXRoKPZjc8r1oJQUrgc7y2ok3CBlou+/nn00QDFCn4/C2YxwGOJLX88x5LAUkd8fw3ZBBChVetOvrqFUUCkad4vK+bCEFMYfR89OCMwYebrzt4plRDwxIrOfvsF0aCj2Y3PK9aCUFK4HO8tqJNwgZaLvt559NEAxQp+PwtmMcBjiS1/PMeSwFJHfH8N2QQAoUXrTr66hVFApGneLyvmwhBTGH0fPTgjMGHm7A7+OZUQ8MSKzn77BdGgo9mNzyvWglBSuBzvLaiTcIGWi77+efTRAMUKfj8LZjHAY4ktfzzHksBSR3x/DdkEAKFF606+uoVRQKRp3i8r5sIQUxh9Hz04IzBh5uwO/jmVEPDEis5++wXRoKPZjc8r1oJQUrgc7y2ok3CBlou+3nn00QDFCn4/C2YxwGOJLX88x5LAUkd8fw3ZBBChVetOvrqFUUCkad4vK+bCEFMYfR89OCMwYebrzt4plRDwxIrOfvsF0aCj2Y3PK9aCUFK4HO8tqJNwgZaLvt559NEAxQp+PwtmMcBjiS1/PMeSwFJHfH8N2QQAoUXrTr66hVFApGneLyvmwhBTGH0fPTgjMGHm7A7+OZUQ8MSKzn77BdGgo9mNzyvWglBSuBzvLaiTcIGWi77+efTRAMUKfj8LZjHAY4ktfzzHksBSR3x/DdkEAKFF606+uoVRQKRp3i8r5sIQUxh9Hz04IzBh5uwO/jmVEPDEis5++wXRoKPZjc8r1oJQUrgc7y2ok3CBk=",
    // );
    // audioRef.current.volume = 0.5;
    // audioRef.current.play().catch(() => {});

    // Flash background
    // setFlashBackground(true);
    // setTimeout(() => setFlashBackground(false), 100);
    // setTimeout(() => setFlashBackground(true), 200);
    // setTimeout(() => setFlashBackground(false), 300);
    // setTimeout(() => setFlashBackground(true), 400);
    // setTimeout(() => setFlashBackground(false), 500);

    // Move NO button randomly
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 100;
    setNoButtonPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });

    // Show message after 3 attempts
    if (noAttempts >= 2) {
      setAnswered(true);
      setSaidYes(false);
    }
  };

  const handleHeartClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount >= 9) {
      setShowKittens(true);
      setTimeout(() => setShowKittens(false), 1000);
      setClickCount(0);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-100 relative overflow-hidden ${
        flashBackground
          ? "bg-black"
          : "bg-gradient-to-br from-rose-100 via-pink-50 to-red-100"
      }`}
      style={{
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {/* Animated background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-200 opacity-20"
            style={{
              fontSize: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Show confetti and hearts when YES is clicked */}
      <AnimatePresence>
        {saidYes && (
          <>
            <Confetti />
            <FloatingHearts />
          </>
        )}
      </AnimatePresence>

      {/* Kitten Easter Egg */}
      <AnimatePresence>{showKittens && <KittenExplosion />}</AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <AnimatePresence mode="wait">
          {!answered ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: flashBackground ? [0, -5, 5, -5, 5, 0] : 0,
                y: flashBackground ? [0, -20, 20, -20, 20, 0] : 0,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <motion.h1
                className="text-7xl md:text-5xl font-bold text-transparent bg-clip-text bg-red-600 mb-8 drop-shadow-2xl cursor-pointer select-none"
                animate={
                  noAttempts > 0
                    ? {
                        rotate: [-10, 10, -10, 10, 0],
                        scale: [1, 1.1, 1, 1.1, 1],
                      }
                    : {}
                }
                transition={{ duration: 0.5 }}
                onClick={handleHeartClick}
              >
                Eniola mi will you be my Valentine? ❤️
              </motion.h1>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  whileTap={{ scale: 0 }}
                  onClick={handleYes}
                  className="px-16 py-6 bg-red-500 cursor-pointer text-white text-3xl font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 "
                  style={{ fontFamily: "'Pacifico', cursive" }}
                >
                  YES!
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNo}
                  className="px-16 py-6 bg-black cursor-pointer text-white text-3xl font-bold rounded-full shadow-2xl hover:shadow-gray-700/50 transition-all duration-300"
                  style={{
                    position: noAttempts > 0 ? "fixed" : "relative",
                    left: noAttempts > 0 ? `${noButtonPos.x}px` : "auto",
                    top: noAttempts > 0 ? `${noButtonPos.y}px` : "auto",
                    fontFamily: "'Pacifico', cursive",
                  }}
                  animate={
                    noAttempts > 0
                      ? {
                          rotate: [0, 360],
                          scale: [1, 0.8, 1.2, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  NO
                </motion.button>
              </div>

              {/* {noAttempts > 0 && noAttempts < 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl text-red-600 font-semibold mt-8"
                >
                  The button is running away! 🏃‍♂️💨
                </motion.p>
              )} */}
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 200,
              }}
              className="space-y-8"
            >
              {saidYes ? (
                <>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex justify-center items-center"
                  >
                    <img className="w-50 " src={love} alt="Love" />
                  </motion.div>
                  <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-red-500 mb-6">
                    You made me the happiest person alive! ❤️
                  </h2>
                  <motion.p
                    className="text-3xl text-rose-700 font-semibold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    I love you so much! 💕✨
                  </motion.p>
                </>
              ) : (
                <>
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 10, 0],
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-9xl mb-8"
                  >
                    😢
                  </motion.div>
                  <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
                    How could you say NO? 😢
                  </h2>
                  <p className="text-3xl text-gray-700 font-semibold">
                    But I'll still love you! 💔💕
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setAnswered(false);
                      setNoAttempts(0);
                      if (bgMusicRef.current) {
                        bgMusicRef.current.play().catch(() => {});
                      }
                    }}
                    className="mt-8 px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
                    style={{ fontFamily: "'Pacifico', cursive" }}
                  >
                    Try Again? 🥺
                  </motion.button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Easter Egg Hint */}
      {!answered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="absolute bottom-8 text-center text-gray-500 text-sm"
        >
          💡 Hint: Click the main text 10 times for a surprise!
        </motion.div>
      )}

      {/* Font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Pacifico&display=swap');
      `}</style>
    </div>
  );
}
