import { handlerPath } from '@libs/handler-resolver';

export const importFileParser = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: 'kh-shop-files',
        event: 's3:ObjectCreated:*',
        rules: [{ prefix: 'uploads/' }],
        existing: true,
      },
    },
  ],
};