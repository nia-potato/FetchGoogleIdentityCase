import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import { FetchGoogleIdentityCase } from './FetchGoogleIdentityCaseExtension';

export const FetchGoogleIdentityCaseExtension = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: 'FetchGoogleIdentityCase',
    component: FetchGoogleIdentityCase,
  }),
);
