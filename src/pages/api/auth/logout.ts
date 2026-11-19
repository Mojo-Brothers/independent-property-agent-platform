import type { APIRoute } from 'astro';
import { getSupabaseClient } from '../../../lib/supabase';

export const POST: APIRoute = async ({ cookies }) => {
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }

    cookies.delete('ipa_admin_token', { path: '/' });

    return new Response(
      JSON.stringify({ success: true, message: 'Logout berhasil.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Logout error:', err);
    cookies.delete('ipa_admin_token', { path: '/' });
    return new Response(
      JSON.stringify({ success: true, message: 'Session dihentikan.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
