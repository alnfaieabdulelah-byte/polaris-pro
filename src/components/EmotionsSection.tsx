"use client";

import { useState, useCallback } from "react";
import { emotions } from "@/data/songs";
import type { EmotionCategory } from "@/data/songs";
import AmbientEnvironment from "./AmbientEnvironment";
import SongCard from "./SongCard";
import PolarisStar from "./PolarisStar";

export default function EmotionsSection() {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionCategory | null>(null);
  const [shuffledIndex, setShuffledIndex] = useState<number | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleSelectEmotion = useCallback(
    (emotion: EmotionCategory) => {
      if (selectedEmotion?.id === emotion.id) {
        setSelectedEmotion(null);
        setShuffledIndex(null);
      } else {
        setSelectedEmotion(emotion);
        setShuffledIndex(null);
      }
    },
    [selectedEmotion]
  );

  const handleShuffle = useCallback(() => {
    if (!selectedEmotion) return;
    setIsShuffling(true);

    setTimeout(() => {
      const randomIndex = Math.floor(
        Math.random() * selectedEmotion.songs.length
      );
      setShuffledIndex(randomIndex);
      setIsShuffling(false);
    }, 800);
  }, [selectedEmotion]);

  const displayedSongs = selectedEmotion
    ? shuffledIndex !== null
      ? [selectedEmotion.songs[shuffledIndex]]
      : selectedEmotion.songs
    : [];

  return (
    <section id="emotions" className="relative py-24 md:py-32">
      {/* Background ambient for selected emotion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {selectedEmotion && (
          <AmbientEnvironment
            key={selectedEmotion.id}
            emotionId={selectedEmotion.id}
            primaryColor={selectedEmotion.ambientColor}
            secondaryColor={selectedEmotion.accentColor}
            animation={selectedEmotion.animation}
            intensity={0.6}
          />
        )}
        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.8) 100%)",
          }}
        />
      </div>

      <div className="container-polaris relative z-10">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-8 bg-white/20" />
            <span className="text-white/30 text-xs font-semibold tracking-[0.4em] uppercase">
              Section A
            </span>
          </div>
          <h2
            className="font-black text-white"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Emotions
          </h2>
          <p className="text-white/40 mt-3 text-base md:text-lg font-light max-w-md">
            How are you feeling right now? Let the music guide you.
          </p>
        </div>

        {/* Emotion Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {emotions.map((emotion, i) => (
            <EmotionCard
              key={emotion.id}
              emotion={emotion}
              isSelected={selectedEmotion?.id === emotion.id}
              onClick={() => handleSelectEmotion(emotion)}
              index={i}
            />
          ))}
        </div>

        {/* Selected emotion detail */}
        {selectedEmotion && (
          <div
            className="mt-12 md:mt-16 fade-up"
            key={selectedEmotion.id}
          >
            {/* Emotion header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-3xl md:text-4xl"
                    style={{ color: selectedEmotion.ambientColor }}
                  >
                    {selectedEmotion.icon}
                  </span>
                  <h3
                    className="font-bold text-2xl md:text-3xl text-white"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {selectedEmotion.label}
                  </h3>
                  <span
                    className="text-lg font-light"
                    style={{ color: `${selectedEmotion.ambientColor}80` }}
                  >
                    {selectedEmotion.labelAr}
                  </span>
                </div>
                <p className="text-white/40 text-sm font-medium italic">
                  &ldquo;{selectedEmotion.description}&rdquo;
                </p>
              </div>

              {/* Shuffle button */}
              <ShuffleButton
                onClick={handleShuffle}
                isShuffling={isShuffling}
                color={selectedEmotion.ambientColor}
                isActive={shuffledIndex !== null}
                onReset={() => setShuffledIndex(null)}
              />
            </div>

            {/* Songs grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {displayedSongs.map((song, i) => (
                <div
                  key={song.id}
                  className="card-animate-in"
                  style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                >
                  <SongCard
                    song={song}
                    index={i}
                    accentColor={selectedEmotion.ambientColor}
                  />
                </div>
              ))}
            </div>

            {shuffledIndex !== null && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShuffledIndex(null)}
                  className="text-white/30 text-xs tracking-widest uppercase hover:text-white/60 transition-colors"
                >
                  ← Show all {selectedEmotion.songs.length} songs
                </button>
              </div>
            )}
          </div>
        )}

        {!selectedEmotion && (
          <div className="mt-16 text-center">
            <p className="text-white/20 text-sm font-medium tracking-widest uppercase">
              ↑ Select an emotion above to begin
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Individual emotion card
function EmotionCard({
  emotion,
  isSelected,
  onClick,
  index,
}: {
  emotion: EmotionCategory;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      onClick={onClick}
      className="emotion-card text-left p-4 md:p-5 rounded-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      style={
        {
          background: isSelected
            ? `linear-gradient(135deg, ${emotion.ambientColor}25 0%, ${emotion.ambientColor}10 100%)`
            : "rgba(255,255,255,0.04)",
          border: isSelected
            ? `1px solid ${emotion.ambientColor}50`
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: isSelected
            ? `0 0 30px ${emotion.ambientColor}20, 0 4px 20px rgba(0,0,0,0.4)`
            : "none",
          "--accent-color": `${emotion.ambientColor}20`,
          animationDelay: `${index * 0.05}s`,
        } as React.CSSProperties
      }
      aria-pressed={isSelected}
      aria-label={`Select ${emotion.label} emotion`}
    >
      {/* Icon */}
      <div
        className="text-2xl md:text-3xl mb-3 block"
        style={{
          color: isSelected ? emotion.ambientColor : "rgba(255,255,255,0.6)",
          transition: "color 0.3s ease",
          filter: isSelected
            ? `drop-shadow(0 0 8px ${emotion.ambientColor}80)`
            : "none",
        }}
      >
        {emotion.icon}
      </div>

      {/* Label */}
      <div
        className="font-bold text-sm md:text-base transition-colors"
        style={{
          color: isSelected ? "#fff" : "rgba(255,255,255,0.7)",
        }}
      >
        {emotion.label}
      </div>
      <div
        className="text-xs mt-0.5 transition-colors"
        style={{
          color: isSelected
            ? `${emotion.ambientColor}90`
            : "rgba(255,255,255,0.25)",
        }}
      >
        {emotion.labelAr}
      </div>

      {/* Song count */}
      <div
        className="mt-2 text-xs font-medium"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        {emotion.songs.length} songs
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div
          className="mt-2 h-0.5 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${emotion.ambientColor}, transparent)`,
          }}
        />
      )}
    </button>
  );
}

// Shuffle button component
function ShuffleButton({
  onClick,
  isShuffling,
  color,
  isActive,
  onReset,
}: {
  onClick: () => void;
  isShuffling: boolean;
  color: string;
  isActive: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {isActive && (
        <button
          onClick={onReset}
          className="text-xs text-white/30 tracking-widest uppercase hover:text-white/60 transition-colors"
        >
          Reset
        </button>
      )}
      <button
        onClick={onClick}
        disabled={isShuffling}
        className="group flex items-center gap-3 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed"
        style={{
          background: `linear-gradient(135deg, ${color}30, ${color}15)`,
          border: `1px solid ${color}50`,
          color: "#fff",
          boxShadow: isShuffling ? `0 0 20px ${color}40` : "none",
        }}
        aria-label="Shuffle songs"
      >
        <PolarisStar
          size={16}
          color={color}
          glow={false}
          animated={false}
          spinning={isShuffling}
          className={isShuffling ? "polaris-star-spin" : "group-hover:polaris-star"}
        />
        <span className="tracking-widest uppercase text-xs">
          {isShuffling ? "Shuffling..." : "Shuffle"}
        </span>
      </button>
    </div>
  );
}
