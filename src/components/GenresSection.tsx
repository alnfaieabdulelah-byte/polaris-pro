"use client";

import { useState, useCallback } from "react";
import { genres } from "@/data/songs";
import type { GenreCollection } from "@/data/songs";
import SongCard from "./SongCard";
import PolarisStar from "./PolarisStar";

export default function GenresSection() {
  const [selectedGenre, setSelectedGenre] = useState<GenreCollection | null>(null);
  const [shuffledIndex, setShuffledIndex] = useState<number | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleSelectGenre = useCallback(
    (genre: GenreCollection) => {
      if (selectedGenre?.id === genre.id) {
        setSelectedGenre(null);
        setShuffledIndex(null);
      } else {
        setSelectedGenre(genre);
        setShuffledIndex(null);
      }
    },
    [selectedGenre]
  );

  const handleShuffle = useCallback(() => {
    if (!selectedGenre) return;
    setIsShuffling(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * selectedGenre.songs.length);
      setShuffledIndex(randomIndex);
      setIsShuffling(false);
    }, 800);
  }, [selectedGenre]);

  const displayedSongs = selectedGenre
    ? shuffledIndex !== null
      ? [selectedGenre.songs[shuffledIndex]]
      : selectedGenre.songs
    : [];

  return (
    <section id="genres" className="relative py-24 md:py-32">
      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: selectedGenre
            ? `radial-gradient(ellipse 60% 50% at 50% 30%, ${selectedGenre.accentColor}08 0%, transparent 70%)`
            : "transparent",
          transition: "background 0.8s ease",
        }}
        aria-hidden="true"
      />

      <div className="container-polaris relative z-10">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-8 bg-white/20" />
            <span className="text-white/30 text-xs font-semibold tracking-[0.4em] uppercase">
              Section B
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
            Genres
          </h2>
          <p className="text-white/40 mt-3 text-base md:text-lg font-light max-w-md">
            Collections curated by taste. Not by algorithm.
          </p>
        </div>

        {/* Genre cards — horizontal scroll on mobile, grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {genres.map((genre, i) => (
            <GenreCard
              key={genre.id}
              genre={genre}
              isSelected={selectedGenre?.id === genre.id}
              onClick={() => handleSelectGenre(genre)}
              index={i}
            />
          ))}
        </div>

        {/* Selected genre songs */}
        {selectedGenre && (
          <div className="mt-12 md:mt-16 fade-up" key={selectedGenre.id}>
            {/* Genre header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div>
                <h3
                  className="font-bold text-2xl md:text-3xl text-white"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {selectedGenre.label}
                </h3>
                <p
                  className="text-sm font-light mt-1"
                  style={{ color: `${selectedGenre.accentColor}70` }}
                >
                  {selectedGenre.labelAr}
                </p>
                <p className="text-white/30 text-sm mt-1">
                  {selectedGenre.description}
                </p>
              </div>

              {/* Shuffle */}
              <div className="flex items-center gap-3">
                {shuffledIndex !== null && (
                  <button
                    onClick={() => setShuffledIndex(null)}
                    className="text-xs text-white/30 tracking-widest uppercase hover:text-white/60 transition-colors"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={handleShuffle}
                  disabled={isShuffling}
                  className="flex items-center gap-3 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: `linear-gradient(135deg, ${selectedGenre.accentColor}25, ${selectedGenre.accentColor}10)`,
                    border: `1px solid ${selectedGenre.accentColor}40`,
                    color: "#fff",
                  }}
                  aria-label="Shuffle genre songs"
                >
                  <PolarisStar
                    size={16}
                    color={selectedGenre.accentColor}
                    glow={false}
                    animated={false}
                    spinning={isShuffling}
                  />
                  <span className="tracking-widest uppercase text-xs">
                    {isShuffling ? "Shuffling..." : "Shuffle"}
                  </span>
                </button>
              </div>
            </div>

            {/* Songs */}
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
                    accentColor={selectedGenre.accentColor}
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
                  ← Show all {selectedGenre.songs.length} songs
                </button>
              </div>
            )}
          </div>
        )}

        {!selectedGenre && (
          <div className="mt-16 text-center">
            <p className="text-white/20 text-sm font-medium tracking-widest uppercase">
              ↑ Select a collection above to explore
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function GenreCard({
  genre,
  isSelected,
  onClick,
  index,
}: {
  genre: GenreCollection;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      onClick={onClick}
      className="emotion-card text-left p-6 md:p-8 rounded-2xl transition-all duration-300 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      style={
        {
          background: isSelected
            ? `linear-gradient(135deg, ${genre.accentColor}20 0%, ${genre.accentColor}08 100%)`
            : "rgba(255,255,255,0.04)",
          border: isSelected
            ? `1px solid ${genre.accentColor}40`
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: isSelected
            ? `0 0 40px ${genre.accentColor}15, 0 8px 30px rgba(0,0,0,0.4)`
            : "none",
          "--accent-color": `${genre.accentColor}15`,
          animationDelay: `${index * 0.1}s`,
        } as React.CSSProperties
      }
      aria-pressed={isSelected}
      aria-label={`Select ${genre.label} genre`}
    >
      {/* Icon + song count row */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="text-3xl"
          style={{
            color: isSelected ? genre.accentColor : "rgba(255,255,255,0.5)",
            filter: isSelected
              ? `drop-shadow(0 0 10px ${genre.accentColor}60)`
              : "none",
            transition: "all 0.3s ease",
          }}
        >
          {genre.icon}
        </span>
        <span
          className="text-xs font-semibold px-2 py-1 rounded-full"
          style={{
            background: isSelected
              ? `${genre.accentColor}20`
              : "rgba(255,255,255,0.05)",
            border: isSelected
              ? `1px solid ${genre.accentColor}30`
              : "1px solid rgba(255,255,255,0.08)",
            color: isSelected ? genre.accentColor : "rgba(255,255,255,0.3)",
          }}
        >
          {genre.songs.length} songs
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-bold text-lg md:text-xl leading-tight mb-2 transition-colors"
        style={{ color: isSelected ? "#fff" : "rgba(255,255,255,0.75)" }}
      >
        {genre.label}
      </h3>

      <p
        className="text-sm font-light leading-relaxed"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {genre.description}
      </p>

      {/* Bottom accent line */}
      {isSelected && (
        <div
          className="mt-4 h-px rounded-full"
          style={{
            background: `linear-gradient(90deg, ${genre.accentColor}80, transparent)`,
          }}
        />
      )}
    </button>
  );
}
