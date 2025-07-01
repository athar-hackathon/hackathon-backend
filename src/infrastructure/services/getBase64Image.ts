import fs from "fs";
import path from "path"

export const getBase64Image = (imageUrl?: string): string | undefined => {
  if (!imageUrl) return undefined;
  const filePath = path.join(__dirname, "../../../uploads", imageUrl);
  try {
    const fileData = fs.readFileSync(filePath);
    return `data:image/${path
      .extname(imageUrl)
      .slice(1)};base64,${fileData.toString("base64")}`;
  } catch (err) {
    return undefined;
  }
};