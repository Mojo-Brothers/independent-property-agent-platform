import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getSupabaseClient } from '../../lib/supabase';

const inquirySchema = z.object({
  full_name: z.string().min(2, 'Nama minimal 2 karakter').max(100),
  phone_whatsapp: z.string().min(8, 'Nomor WhatsApp minimal 8 digit').max(20),
  email: z.string().email('Format email tidak valid').optional().or(z.literal('')),
  property_id: z.string().optional(),
  budget_range: z.string().min(1, 'Pilih rentang budget'),
  purchase_purpose: z.enum(['Tempat Tinggal Pribadi', 'Investasi Sewa', 'Pilihan Pertama Anak', 'Lainnya']),
  message: z.string().max(1000).optional(),
  consent_agreed: z.boolean().refine((val) => val === true, 'Persetujuan pemrosesan data diperlukan'),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawData = await request.json();
    const validationResult = inquirySchema.safeParse(rawData);

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
      // 1. Create or match lead
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .insert({
          full_name: data.full_name,
          phone_whatsapp: data.phone_whatsapp,
          email: data.email || null,
          source: 'Website Property Inquiry',
          status: 'New',
          notes: `Tujuan: ${data.purchase_purpose}. Budget: ${data.budget_range}.`,
        })
        .select('id')
        .single();

      if (leadError) {
        console.warn('Supabase Lead Insert Notice:', leadError);
      }

      const leadId = leadData?.id;

      // 2. Insert inquiry
      const { error: inquiryError } = await supabase.from('inquiries').insert({
        lead_id: leadId || null,
        property_id: data.property_id || null,
        full_name: data.full_name,
        phone_whatsapp: data.phone_whatsapp,
        email: data.email || null,
        budget_range: data.budget_range,
        purchase_purpose: data.purchase_purpose,
        message: data.message || '',
        consent_agreed: data.consent_agreed,
        status: 'New',
      });

      if (inquiryError) {
        console.error('Supabase Inquiry Error:', inquiryError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Permintaan informasi berhasil terkirim. Bpk. Robby Viory Fansya akan segera menghubungi Anda melalui WhatsApp.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Inquiry API Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Terjadi kesalahan sistem saat memproses permintaan. Silakan hubungi via WhatsApp langsung.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
