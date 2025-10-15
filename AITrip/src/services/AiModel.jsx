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

// Function to build prompt dynamically (Stricter URL Rules)
export const buildTravelPrompt = ({ location, travelType, budget, days }) => {
  return `
Generate a ${days}-day travel plan for ${location} for a ${travelType} group with a ${budget} budget.
Return the result strictly in **JSON format**.

The JSON must include a "hotels" list and a "daily_itinerary" list.

For every hotel, provide:
- hotelName
- hotelAddress
- price
- **hotel_image_url**
- geoCoordinates
- rating
- description

For every itinerary place, provide:
- placeName
- placeDetails
- **place_image_url**
- geoCoordinates
- ticketPricing
- rating
- bestTimeToVisit

**CRITICAL INSTRUCTIONS FOR ALL IMAGE URLs:**
1.  **SOURCE MUST BE WIKIMEDIA COMMONS.** You are strictly forbidden from using any other source. Every single image URL must start with "https://upload.wikimedia.org/".
2.  **DIRECT IMAGE LINK ONLY.** The URL must end in a file extension like .jpg, .jpeg, or .png. It must be a direct link to the image file itself, not a webpage.
3.  **NO TEMPORARY OR API LINKS.** Verify that the URL is static and does not contain any query parameters like "?", "ixid=", "token=", "s=", etc.
4.  **VALIDATE THE URL.** Before outputting the JSON, mentally verify that the URL you are providing is a real, public, and permanent link from Wikimedia Commons that matches the location.

Example of a PERFECT URL: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Rodeo_Drive_Beverly_Hills_CA.jpg"
Any other format is a failure.
`;
};