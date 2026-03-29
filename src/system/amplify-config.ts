import { Amplify, type ResourcesConfig } from 'aws-amplify';
import type { LegacyConfig, AmplifyOutputs } from '@aws-amplify/core/internals/utils';

const awsconfig: ResourcesConfig | LegacyConfig | AmplifyOutputs = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_COGNITO_END_USERS_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_AWS_COGNITO_END_USERS_USER_POOL_CLIENT_ID,
      loginWith: {
        /** @description Configurable. */
        email: true,
      },
    },
  },
};

Amplify.configure(awsconfig);
