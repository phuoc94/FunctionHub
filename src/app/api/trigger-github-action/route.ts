import axios, { AxiosResponse } from "axios";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const headers = request.headers;

  const authorization = request.headers.get("authorization");
  const target = request.headers.get("target");
  const eventType = request.headers.get("event_type");

  if (!target || !authorization || !eventType) {
    return NextResponse.json(
      {
        message: "Missing target or authorization or event_type",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const response: AxiosResponse = await axios.post(
      target,
      {
        event_type: eventType,
      },
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: authorization,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return NextResponse.json(
        {
          status: "Sent to GitHub Actions successfully",
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          error: "Unexpected response from GitHub API",
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
        error: error.response.data,
      },
      {
        status: error.response.status,
      }
    );
  }
}

