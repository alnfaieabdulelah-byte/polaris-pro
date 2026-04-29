"use client";

import { PolarisLogo } from "./PolarisStar";
import PolarisStar from "./PolarisStar";

export default function FooterSection() {
  return (
    <>
      {/* Install Guide Section */}
      <section
        id="install"
        className="relative py-24 md:py-32 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-polaris">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <PolarisStar size={36} glow={true} animated={true} className="mx-auto mb-6" />
              <h2
                className="font-black text-white mb-4"
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Install POLARIS
              </h2>
              <p className="text-white/40 font-light">
                Add POLARIS to your home screen for the full experience
              </p>
            </div>

            {/* Install cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <InstallCard
                icon="📱"
                title="iPhone"
                steps={[
                  'Open this page in Safari',
                  'Tap the Share button (□↑)',
                  'Scroll down → "Add to Home Screen"',
                  'Tap "Add" — POLARIS appears on your home screen',
                  'Open it — it launches like a native app',
                ]}
                color="#007AFF"
              />
              <InstallCard
                icon="📟"
                title="iPad"
                steps={[
                  'Open this page in Safari on iPad',
                  'Tap the Share button in the toolbar',
                  'Select "Add to Home Screen"',
                  'Name it "POLARIS" and tap Add',
                  'It will appear in your iPad dock',
                ]}
                color="#5856D6"
              />
              <InstallCard
                icon="💻"
                title="MacBook / Chrome"
                steps={[
                  'Open Chrome browser on MacBook',
                  'Click the install icon (⊕) in the address bar',
                  'Or: Menu → "Install POLARIS"',
                  'Click Install in the dialog',
                  'POLARIS opens as a standalone window',
                ]}
                color="#34C759"
              />
              <InstallCard
                icon="🪟"
                title="Windows / Desktop"
                steps={[
                  'Open Chrome or Edge browser',
                  'Look for the install icon (⊕) in the address bar',
                  'Click "Install POLARIS"',
                  'It appears in your Start Menu and desktop',
                  'Launch it for a full standalone experience',
                ]}
                color="#FF9500"
              />
            </div>

            {/* Add songs guide */}
            <div
              className="mt-12 p-6 md:p-8 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-3">
                <span className="text-xl">🎵</span>
                How to Add Songs & Genres
              </h3>
              <div className="space-y-4">
                <GuideStep
                  number="01"
                  title="Open the songs data file"
                  description='Find the file: src/data/songs.ts — this is your music library. All songs live here.'
                />
                <GuideStep
                  number="02"
                  title="Copy an existing song block"
                  description='Find any song between { } brackets. Copy the whole block including all fields.'
                />
                <GuideStep
                  number="03"
                  title="Fill in the details"
                  description='Change title, artist, album, Spotify URL, and story. Each field is clearly labeled.'
                />
                <GuideStep
                  number="04"
                  title="Get the Spotify link"
                  description='On Spotify: right-click any song → Share → Copy Song Link. Paste it as spotifyUrl.'
                />
                <GuideStep
                  number="05"
                  title="To add a new genre"
                  description='Scroll to the genres array in songs.ts. Copy any genre block and fill it in with your songs.'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 border-t"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}
      >
        <div className="container-polaris">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <PolarisLogo size="sm" />
            <p className="text-white/20 text-xs tracking-widest uppercase text-center">
              Your Emotional Music Universe
            </p>
            <p className="text-white/15 text-xs">
              © {new Date().getFullYear()} POLARIS
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function InstallCard({
  icon,
  title,
  steps,
  color,
}: {
  icon: string;
  title: string;
  steps: string[];
  color: string;
}) {
  return (
    <div
      className="p-5 md:p-6 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-bold text-white text-base">{title}</h3>
      </div>
      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-white/50">
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
              style={{
                background: `${color}20`,
                color: color,
                border: `1px solid ${color}30`,
              }}
            >
              {i + 1}
            </span>
            <span className="leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function GuideStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span
        className="flex-shrink-0 text-xs font-black tracking-widest"
        style={{ color: "rgba(255,255,255,0.15)" }}
      >
        {number}
      </span>
      <div>
        <h4 className="font-semibold text-white/80 text-sm mb-0.5">{title}</h4>
        <p className="text-white/35 text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
