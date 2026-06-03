export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {
    colors: { brand: { 50:"#eff6ff",500:"#3b82f6",600:"#2563eb",700:"#1d4ed8" } },
    keyframes: {
      fadeIn: { "0%": { opacity:0, transform:"translateY(8px)" }, "100%": { opacity:1, transform:"translateY(0)" } },
    },
    animation: { fadeIn: "fadeIn .5s ease-out both" },
  }},
  plugins: [],
};
