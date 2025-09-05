import type { Config } from "tailwindcss";

export default {
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				/* AI-Native Core Design System */
				background: 'hsl(var(--background))',
				surface: 'hsl(var(--surface))',
				'surface-elevated': 'hsl(var(--surface-elevated))',
				'surface-glass': 'hsl(var(--surface-glass))',
				'surface-neural': 'hsl(var(--surface-neural))',
				foreground: 'hsl(var(--foreground))',
				'foreground-muted': 'hsl(var(--foreground-muted))',
				'foreground-subtle': 'hsl(var(--foreground-subtle))',
				'foreground-ai': 'hsl(var(--foreground-ai))',
				
				/* AI-Native Brand Colors */
				'brand-primary': 'hsl(var(--brand-primary))',
				'brand-primary-dark': 'hsl(var(--brand-primary-dark))',
				'brand-primary-light': 'hsl(var(--brand-primary-light))',
				'brand-secondary': 'hsl(var(--brand-secondary))',
				'brand-neural': 'hsl(var(--brand-neural))',
				'brand-electric': 'hsl(var(--brand-electric))',
				
				/* Status Colors */
				success: 'hsl(var(--success))',
				'success-light': 'hsl(var(--success-light))',
				warning: 'hsl(var(--warning))',
				'warning-light': 'hsl(var(--warning-light))',
				error: 'hsl(var(--error))',
				'error-light': 'hsl(var(--error-light))',
				info: 'hsl(var(--info))',
				'info-light': 'hsl(var(--info-light))',
				
				/* Status Specific */
				'status-pending': 'hsl(var(--status-pending))',
				'status-pending-light': 'hsl(var(--status-pending-light))',
				'status-completed': 'hsl(var(--status-completed))',
				'status-completed-light': 'hsl(var(--status-completed-light))',
				'status-in-progress': 'hsl(var(--status-in-progress))',
				'status-in-progress-light': 'hsl(var(--status-in-progress-light))',
				'status-cancelled': 'hsl(var(--status-cancelled))',
				'status-cancelled-light': 'hsl(var(--status-cancelled-light))',

				/* Shadcn Component Colors */
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-neural': 'var(--gradient-neural)',
				'gradient-glass': 'var(--gradient-glass)',
				'gradient-subtle': 'var(--gradient-subtle)',
				'gradient-success': 'var(--gradient-success)',
				'gradient-ai-glow': 'var(--gradient-ai-glow)',
			},
			boxShadow: {
				'brand': 'var(--shadow-brand)',
				'neural': 'var(--shadow-neural)',
				'ai-glow': 'var(--glow-ai)',
				'neural-glow': 'var(--glow-neural)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'ai-pulse': {
					'0%, 100%': { boxShadow: '0 0 5px hsl(var(--brand-primary) / 0.3)' },
					'50%': { boxShadow: '0 0 20px hsl(var(--brand-primary) / 0.6)' }
				},
				'neural-flow': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'50%': { opacity: '1' },
					'100%': { transform: 'translateX(100%)', opacity: '0' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'ai-pulse': 'ai-pulse 2s ease-in-out infinite',
				'neural-flow': 'neural-flow 3s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.5s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
