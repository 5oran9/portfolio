import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: '필수 값이 누락되었습니다.' }, { status: 400 });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!to || !from || !process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: '서버 메일 설정이 누락되었습니다.' }, { status: 500 });
    }

    const subject = `[Portfolio Inquiry] ${name} (${email})`;
    const text =
      `이름: ${name}\n` +
      `이메일: ${email}\n` +
      `전화: ${phone || '-'}\n\n` +
      `메시지:\n${message}\n`;

    await resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo: email, // 답장 누르면 상대 이메일로 가게
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: '메일 전송 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
