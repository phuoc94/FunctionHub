import axios, { AxiosResponse } from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response: AxiosResponse = await axios.post(
      'https://api.github.com/repos/phuoc94/trigger-vercel-deploy-with-github-actions/dispatches',
      {
        event_type: 'webhook',
      },
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json(
        {
          status: 'Sent to GitHub Actions successfully',
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          error: 'Unexpected response from GitHub API',
          statusCode: response.status,
        },
        {
          status: 500,
        }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500,
      }
    );
  }
}