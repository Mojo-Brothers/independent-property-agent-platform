import type { APIRoute } from 'astro';
import { getSupabaseClient } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email dan password wajib diisi.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = getSupabaseClient();

    // 1. If Supabase is connected, authenticate via Supabase Auth
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.session) {
        return new Response(
          JSON.stringify({ success: false, message: error?.message || 'Kredensial login tidak valid.' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Set secure HTTP-only session cookie
      cookies.set('ipa_admin_token', data.session.access_token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return new Response(
        JSON.stringify({ success: true, message: 'Login berhasil.', user: data.user }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. If Supabase credentials are not yet configured in .env, check master admin initial setup
    // Initial master credentials for setup verification: admin@ivorygraceproperty.com / AdminProperti2026!
    const isMasterEmail = email === 'admin@ivorygraceproperty.com' || email === 'robby@robbyproperty.com';
    if (isMasterEmail && password === 'AdminProperti2026!') {
      cookies.set('ipa_admin_token', 'session-token-ivory-grace-admin', {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Login master berhasil (Mode Konfigurasi Awal).',
          user: { email: email, role: 'super_admin' },
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Kombinasi email atau kata sandi tidak cocok.',
      }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Login API error:', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Terjadi gangguan internal server.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
