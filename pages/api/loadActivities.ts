import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function loadActivities(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'activities.json');
    const fileContents = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : "";
    const activities = fileContents === "" ? [] : JSON.parse(fileContents);
    res.status(200).json(activities);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
