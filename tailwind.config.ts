import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        theme: {
          background: {
            DEFAULT: "#0F0B25",
            secondary: "#1A123E",
          },
          card: {
            DEFAULT: "#1E1B2E",
          },
          accent: {
            pink: {
              DEFAULT: "#EC4899",
              hover: "#BE185D",
            },
            purple: {
              DEFAULT: "#A855F7",
              hover: "#7E22CE",
            },
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },

        glow: {
          "0%": { boxShadow: "0 0 0 0 rgba(236, 72, 153, 0.4)" },
          "100%": { boxShadow: "0 0 20px 10px rgba(168, 85, 247, 0.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      fontSize: {
        h1: ["3.75rem", { lineHeight: "1.2", fontWeight: "700" }], // 60px
        h2: ["2.5rem", { lineHeight: "1.2", fontWeight: "600" }], // 40px
        h3: ["2rem", { lineHeight: "1.2", fontWeight: "600" }], // 32px
        h4: ["1.5rem", { lineHeight: "1.2", fontWeight: "600" }], // 24px
        h5: ["1.25rem", { lineHeight: "1.2", fontWeight: "600" }], // 20px
        h6: ["1rem", { lineHeight: "1.2", fontWeight: "600" }], // 16px
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-theme":
          "linear-gradient(to right, var(--pink-500), var(--purple-500))",
        "gradient-dark":
          "linear-gradient(to bottom right, var(--tw-gradient-stops))",
        "grid-pattern": "url('/grid.svg')",
      },
      perspective: {
        "1200px": "1200px",
      },
      transformStyle: {
        "preserve-3d": "preserve-3d",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".preserve-3d": {
          "transform-style": "preserve-3d",
        },
        ".perspective-1200px": {
          perspective: "1200px",
        },
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
      });
    },
  ],
} satisfies Config;

export default config;
