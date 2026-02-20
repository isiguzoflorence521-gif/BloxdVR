// BloxdVR v1.3.0 - Avatar Mapping Engine
export const AvatarAssets = {
    heads: [
        { name: "Bob", gender: "Male", skin: "Default", eyes: "Blue" },
        { name: "Emma", gender: "Female", skin: "Bright", eyes: "Green" },
        { name: "Sanjay", gender: "Male", skin: "Dark", eyes: "Light Brown" }
    ],
    clothing: {
        tops: ["Hoodie", "Purple Top", "Light Blue Polo", "Green Top"],
        legs: ["Light Blue Jeans", "Brown Trousers", "Tan Shorts"]
    }
};

export function getHandTexture(topName) {
    const colors = {
        "Hoodie": "#FF0000",
        "Purple Top": "#800080",
        "Green Top": "#2ECC71"
    };
    return colors[topName] || "#FFFFFF"; // Default to white if not found
}
