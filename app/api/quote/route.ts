import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'quotes.json');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, company, projectTitle, services, projectDescription, budget, timeline } = body;

    if (!firstName || !lastName || !email || !projectTitle || !services || !projectDescription) {
      return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newQuote = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      phone,
      company,
      projectTitle,
      services,
      projectDescription,
      budget,
      timeline,
      submittedAt: new Date().toISOString(),
    };

    let quotes = [];
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
      quotes = JSON.parse(fileContent);
    }

    quotes.push(newQuote);
    fs.writeFileSync(dataFilePath, JSON.stringify(quotes, null, 2));

    return new NextResponse(JSON.stringify({ message: 'Quote request submitted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
      const quotes = JSON.parse(fileContent);
      return new NextResponse(JSON.stringify(quotes), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new NextResponse(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
