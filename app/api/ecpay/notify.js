export async function POST(req) {
  try {
    const data = await req.formData();
    const params = Object.fromEntries(data);
    console.log('綠界回調資料:', params);
    // 在這裡驗證 CheckMacValue 並儲存訂單狀態
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('回調錯誤:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}