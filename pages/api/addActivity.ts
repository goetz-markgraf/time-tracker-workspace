import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function addActivity(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const activity = req.body;

    const filePath = path.join(process.cwd(), 'activities.json');
    const fileContents = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : "";
    const activities = fileContents === "" ? [] : JSON.parse(fileContents);

    activities.push(activity);

    fs.writeFileSync(filePath, JSON.stringify(activities, null, 2));

    res.status(200).json({ message: 'Activity added successfully!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
