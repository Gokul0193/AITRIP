import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Function to generate AI response (JSON)
export const generateAIResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    });

    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Gemini Error:", error);
    return { error: "Sorry, something went wrong!" };
  }
};

// Function to build prompt dynamically (Strict JSON format)
export const buildTravelPrompt = ({ location, travelType, budget, days }) => {
  return `
Generate a ${days}-day travel plan for ${location} for a ${travelType} group with a ${budget} budget.hotel details atelast 4 hotels.
The response must be in the following JSON format:
You must return the result **strictly as a valid JSON object** with the exact structure shown below — no explanations, no extra text.

---

### 🎯 REQUIRED JSON FORMAT:

{
  "location": "string",
  "total_days": number,
  "budget": "string",
  "travel_type": "string",
  "hotels": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "price": "string",
      "hotel_image_url": "https://upload.wikimedia.org/....(direct_image).jpg",
      "geoCoordinates": {
        "lat": number,
        "lng": number
      },
      "rating": number,
      "description": "string"
    }
  ],
  "daily_itinerary": [
    {
      "day": number,
      "places": [
        {
          "placeName": "string",
          "placeDetails": "string (1 short sentence)",
          "place_image_url": "https://upload.wikimedia.org/....(direct_image).jpg",
          "geoCoordinates": {
            "lat": number,
            "lng": number
          },
          "ticketPricing": "string",
          "rating": number,
          "bestTimeToVisit": "string"
        }
      ]
    }
  ]
}

---

### ⚠️ CRITICAL INSTRUCTIONS FOR IMAGE URLS:
1. All image URLs **must start** with \`https://upload.wikimedia.org/\`.
2. URLs must be **direct image links** ending in .jpg, .jpeg, or .png.
3. **Do not include** query parameters like \`?\`, \`ixid=\`, \`token=\`, etc.
4. Ensure all links are valid Wikimedia Commons images related to ${location}.

Generate exactly this JSON — nothing else.
  `;
};
