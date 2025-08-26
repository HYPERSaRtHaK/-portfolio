// =========================
// Pointer sync for glow effects
// =========================
const syncPointer = ({ x: pointerX, y: pointerY }) => {
  const x = pointerX.toFixed(2);
  const y = pointerY.toFixed(2);
  const xp = (pointerX / window.innerWidth).toFixed(2);
  const yp = (pointerY / window.innerHeight).toFixed(2);

  const root = document.documentElement;
  root.style.setProperty('--x', x);
  root.style.setProperty('--y', y);
  root.style.setProperty('--xp', xp);
  root.style.setProperty('--yp', yp);
}

// =========================
// Global mousemove listener
// =========================
document.addEventListener("mousemove", e => {
  const root = document.documentElement;

  // Update CSS variables for neon glow
  root.style.setProperty("--x", e.clientX);
  root.style.setProperty("--y", e.clientY);
  root.style.setProperty("--xp", e.clientX / window.innerWidth);
  root.style.setProperty("--yp", e.clientY / window.innerHeight);

  // Update hue dynamically for rainbow effect
  const hue = Math.floor((e.clientX / window.innerWidth) * 360);
  root.style.setProperty("--hue", hue);
});

// =========================
// Signboard hover glow effect
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const sign = document.querySelector("body > button:nth-of-type(2) span");
  const signButton = document.querySelector("body > button:nth-of-type(2)");

  if (!sign || !signButton) return; // Prevent errors if element missing

  signButton.addEventListener("mousemove", e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xp = x / rect.width;
    const yp = y / rect.height;

    // Dynamic glowing gradient centered at mouse position
    sign.style.setProperty("--sign-glow", `
      radial-gradient(
        circle at ${xp*100}% ${yp*100}%,
        hsl(${xp*360} 90% 85%),
        hsl(${xp*360} 90% 65%),
        transparent 80%
      )
    `);
  });

  // Reset glow when mouse leaves
  signButton.addEventListener("mouseleave", () => {
    sign.style.setProperty("--sign-glow", "white");
  });
});
