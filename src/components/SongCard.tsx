"use client";

import { useState, useRef, useCallback } from "react";
import type { Song } from "@/data/songs";

interface SongCardProps {
  song: Song;
  index: number;
  accentColor?: string;
}

export default function SongCard({ song, index, accentColor }: SongCardProps) {
  const [storyOpen, setStoryOpen] = useState(false);
  const [arabic, setArabic] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);
  const color = accentColor || song.accentColor;

  // 3D tilt on desktop hover
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTiltStyle({
        transform: `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px) scale(1.01)`,
        transition: "transform 0.1s ease",
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
      transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="song-card relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid rgba(255,255,255,0.08)`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        animationDelay: `${index * 0.08}s`,
        ...tiltStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="article"
      aria-label={`${song.title} by ${song.artist}`}
    >
      {/* Accent color top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
        }}
      />

      {/* Song content */}
      <div className="p-4 md:p-5">
        <div className="flex items-start gap-4">
          {/* Album Cover */}
          <div className="relative flex-shrink-0">
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden"
              style={{
                boxShadow: `0 8px 32px ${color}40, 0 2px 8px rgba(0,0,0,0.6)`,
              }}
            >
              {!imgLoaded && (
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${color}30, transparent)`,
                    animation: "loading-pulse 1.5s ease-in-out infinite",
                  }}
                />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={song.albumCover}
                alt={`${song.album} album cover`}
                className={`album-cover w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImgLoaded(true)}
                onError={(e) => {
                  // Fallback gradient if image fails
                  (e.target as HTMLImageElement).style.display = "none";
                  setImgLoaded(true);
                }}
                loading="lazy"
              />
            </div>
            {/* Emotion tag badge */}
            <div
              className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase"
              style={{
                background: `${color}20`,
                border: `1px solid ${color}50`,
                color: color,
                backdropFilter: "blur(8px)",
              }}
            >
              {song.emotionTag}
            </div>
          </div>

          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-bold text-white truncate text-sm md:text-base leading-tight"
              style={{ letterSpacing: "-0.01em" }}
            >
              {song.title}
            </h3>
            <p className="text-white/50 text-xs md:text-sm mt-0.5 truncate font-medium">
              {song.artist}
            </p>
            <p className="text-white/30 text-xs mt-0.5 truncate">
              {song.album}
            </p>

            {/* Actions row */}
            <div className="flex items-center gap-3 mt-3">
              {/* Spotify Play Button */}
              <a
                href={song.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "#1DB954",
                  color: "#000",
                  boxShadow: "0 2px 12px rgba(29,185,84,0.4)",
                }}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Open ${song.title} on Spotify`}
              >
                <SpotifyIcon />
                <span>Play</span>
              </a>

              {/* Story Toggle */}
              <button
                onClick={() => setStoryOpen(!storyOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                }}
                aria-expanded={storyOpen}
                aria-label="Toggle song story"
              >
                <span className="text-[10px]">{storyOpen ? "▲" : "▼"}</span>
                <span>Story</span>
              </button>
            </div>
          </div>
        </div>

        {/* Glass Story Panel */}
        <div
          className={`story-panel ${storyOpen ? "open" : ""}`}
          aria-hidden={!storyOpen}
        >
          <div
            className="mt-4 rounded-xl p-4 md:p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Language toggle */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: color }}
                />
                <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                  Story
                </span>
              </div>
              <button
                onClick={() => setArabic(!arabic)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: arabic
                    ? `${color}20`
                    : "rgba(255,255,255,0.06)",
                  border: arabic
                    ? `1px solid ${color}50`
                    : "1px solid rgba(255,255,255,0.1)",
                  color: arabic ? color : "rgba(255,255,255,0.5)",
                }}
                aria-pressed={arabic}
                aria-label="Toggle Arabic translation"
              >
                {arabic ? "🇬🇧 EN" : "🇸🇦 AR"}
              </button>
            </div>

            {/* Story text */}
            <p
              className="text-white/70 text-sm leading-relaxed"
              style={{
                direction: arabic ? "rtl" : "ltr",
                fontFamily: arabic
                  ? '"Noto Naskh Arabic", "Arabic UI Text", Georgia, serif'
                  : "inherit",
              }}
            >
              {arabic ? song.story.ar : song.story.en}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotifyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}
