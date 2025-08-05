import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    const client = await db.connect();

    try {
        const data = await client.sql`SELECT * FROM Apikey`;
        return NextResponse.json({ data: data.rows });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
