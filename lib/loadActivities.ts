import fs from 'fs';
import path from 'path';

export const loadActivities = () => {
  const filePath = path.join(process.cwd(), 'activities.json');
  const fileContents = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : "";
  const activities = fileContents === "" ? [] : JSON.parse(fileContents);
  return activities;
};
