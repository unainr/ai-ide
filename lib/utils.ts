import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function safeParseJSON(text: string) {
  try {
    // First try direct parse
    return JSON.parse(text);
  } catch {
    // Clean up common issues
    let cleaned = text.trim();
    
    // Remove markdown code blocks if present
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```\s*$/, '');
    cleaned = cleaned.replace(/^```\s*/i, '').replace(/```\s*$/, '');
    
    // Remove any text before first { and after last }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
      
      try {
        return JSON.parse(cleaned);
      } catch (e) {
        console.error("Failed to parse cleaned JSON:", e);
        console.error("Cleaned text:", cleaned);
        console.error("Original text:", text);
        return null;
      }
    }
    
    console.error("No valid JSON found in AI response");
    console.error("Original text:", text);
    return null;
  }
}
export const DEPENDANCY = () => {
	return {
		postcss: "^8",
		tailwindcss: "^3.4.1",
		autoprefixer: "^10.0.0",
		uuid4: "^2.0.3",
		"tailwind-merge": "^2.4.0",
		"tailwindcss-animate": "^1.0.7",
		"lucide-react": "^0.469.0",
		"react-router-dom": "^7.1.1",
		firebase: "^11.1.0",
		"@google/generative-ai": "^0.21.0",
		"date-fns": "^4.1.0",
		"react-chartjs-2": "^5.3.0",
		"chart.js": "^4.4.7",
	};
};