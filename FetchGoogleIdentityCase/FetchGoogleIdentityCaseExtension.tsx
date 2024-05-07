import React, { useEffect, useState } from 'react';
import { useApi, googleAuthApiRef } from '@backstage/core-plugin-api';
import { FieldExtensionComponentProps } from '@backstage/plugin-scaffolder-react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

export const FetchGoogleIdentityCase = ({
  onChange,
  formData,
  required,
}: FieldExtensionComponentProps<string>) => {
  const googleAuthApi = useApi(googleAuthApiRef);
  const [token, setToken] = useState('');

  useEffect(() => {
    console.log('Custom field component mounted.');
    const fetchToken = async () => {
      try {
        const authToken = await googleAuthApi.getAccessToken(
          'https://www.googleapis.com/auth/cloud-platform',
        );
        console.log('Token fetched: ', authToken);
        setToken(authToken);
        onChange(authToken);
        console.log('OnChange called with token: ', authToken);
      } catch (error) {
        console.error('Failed to fetch Google auth token:', error);
      }
    };

    fetchToken();
  }, [googleAuthApi, onChange]);

  return (
    <FormControl margin="normal" required={required} error={!token}>
      <InputLabel htmlFor="googleAuthToken">Google Auth Token</InputLabel>
      <Input id="googleAuthToken" value={token || ''} readOnly fullWidth />
      <FormHelperText>
        Token used to authenticate with Google services.
      </FormHelperText>
    </FormControl>
  );
};
