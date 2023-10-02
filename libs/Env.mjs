/* eslint-disable import/prefer-default-export */
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const Env = createEnv({
  server: {
    DAILY_LOG_FILE_NAME: z.string().nonempty(),
  },
  client: {
    NEXT_PUBLIC_SITE_NAME: z.string().nonempty(),
    NEXT_PUBLIC_SITE_LOCALE: z.string().nonempty(),
  },
  runtimeEnv: {
    DAILY_LOG_FILE_NAME: process.env.DAILY_LOG_FILE_NAME,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_SITE_LOCALE: process.env.NEXT_PUBLIC_SITE_LOCALE,
  },
});
