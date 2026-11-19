import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getSupabaseClient } from '../../lib/supabase';

const partnershipSchema = z.object({
  company_name: z.string().min(2, 'Nama perusahaan minimal 2 karakter').max(150),
  project_name: z.string().min(2, 'Nama proyek minimal 2 karakter').max(150),
  pic_name: z.string().min(2, 'Nama PIC minimal 2 karakter').max(100),
  email: z.string().email('Format email tidak valid'),
  phone: z.string().min(8, 'Nomor telepon minimal 8 digit').max(25),
  proposal_message: z.string().min(10, 'Jelaskan konsep kerja sama minimal 10 karakter').max(2000),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawData = await request.json();
    const validationResult = partnershipSchema.safeParse(rawData);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = validationResult.data;
    const supabase = getSupabaseClient();

    if (supabase) {
      const { error } = await supabase.from('partnership_requests').insert({
        company_name: data.company_name,
        project_name: data.project_name,
        pic_name: data.pic_name,
        email: data.email,
        phone: data.phone,
        proposal_message: data.proposal_message,
        status: 'Prospect',
      });

      if (error) {
        console.error('Supabase Partnership Error:', error);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Pengajuan kemitraan berhasil diterima. Kami akan meninjau materi proyek dan menghubungi Anda dalam 1x24 jam kerja.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Partnership API Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Terjadi kendala pada pengiriman data. Silakan hubungi langsung melalui email resmi.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
