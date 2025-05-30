/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_BASE_URL: string;
    readonly AUTH_GITHUB_ID: string;
    readonly AUTH_GITHUB_SECRET: string;
    readonly AUTH_GOOGLE_ID: string;
    readonly AUTH_GOOGLE_SECRET: string;
    readonly AUTH_SECRET: string;
    readonly MONGODB_URI: string;
    readonly AWS_ACCESS_KEY_ID: string;
    readonly AWS_SECRET_ACCESS_KEY: string;
    readonly AWS_BUCKET_NAME: string;
    readonly AWS_REGION: string;
  }
}
