import fs from 'fs';
import path from 'path';

// Cache the data in memory to avoid reading the file repeatedly
let cachedData = null;
let lastModified = null;

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'accessions.json');
    const stats = fs.statSync(filePath);
    
    // Check if we need to reload the data
    if (!cachedData || !lastModified || stats.mtime > lastModified) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      cachedData = JSON.parse(fileContents);
      lastModified = stats.mtime;
    }

    // Set cache headers for better performance
    // Cache for 1 hour, stale-while-revalidate for 24 hours
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('ETag', `"${stats.mtime.getTime()}"`);
    
    // Return the cached data
    res.status(200).json(cachedData);
  } catch (error) {
    console.error('Error reading accessions data:', error);
    res.status(500).json({ message: 'Failed to load accessions data' });
  }
}
