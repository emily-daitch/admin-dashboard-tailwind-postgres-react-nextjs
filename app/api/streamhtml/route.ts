export const runtime = 'edge';
  
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  
  export async function GET() {
    const encoder = new TextEncoder();
  
    const readable = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode("<html><body>"));
        await delay(500);
        controller.enqueue(encoder.encode("<ul><li>List Item 1</li>"));
        await delay(500);
        controller.enqueue(encoder.encode("<li>List Item 2</li>"));
        await delay(500);
        controller.enqueue(encoder.encode("<li>List Item 3</li></ul>"));
        await delay(500);
        controller.enqueue(encoder.encode("</body></html>"));
        controller.close();
      },
    });
  
    return new Response(readable, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }