import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'data.csv');
  const data = fs.readFileSync(filePath, 'utf8');

  const items = data.split('\n').map(line => {
    const [createdAt, filename] = line.split(';');
    return { createdAt, filename };
  });

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
