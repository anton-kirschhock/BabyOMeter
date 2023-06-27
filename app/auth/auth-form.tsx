'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { Button } from '@mui/material';

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();
  const login = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'openid email offline_access profile',
        redirectTo: `${process.env.NEXT_PUBLIC_APPURL}/auth/callback`,
      },
    });
  };
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="light"
      showLinks={true}
      redirectTo={`${process.env.NEXT_PUBLIC_APPURL}/auth/callback`}
      magicLink={true}
      providers={[]}
    />
  );
}
