module.exports = [
"[project]/.next-internal/server/app/api/chat/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// import { openai } from "@ai-sdk/openai";
// import { streamText, UIMessage, convertToModelMessages } from "ai";
// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();
//   const result = streamText({
//     model: openai("gpt-4o"),
//     messages: convertToModelMessages(messages),
//   });
//   return result.toUIMessageStreamResponse();
// }
//url to call api
// /api/orchestrator
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
async function POST(req) {
    try {
        const { messages } = await req.json();
        // Extract user message from the messages array
        const lastMessage = messages[messages.length - 1];
        console.log("In last message", lastMessage);
        let userMessage = "";
        if (lastMessage && "parts" in lastMessage && Array.isArray(lastMessage.parts)) {
            const textPart = lastMessage.parts.find((part)=>part.type === "text");
            userMessage = textPart?.text || "";
        } else if (lastMessage && "content" in lastMessage) {
            userMessage = lastMessage.content || "";
        }
        console.log("User message", userMessage);
        // Call FastAPI backend to get the response
        const apiUrl = 'https://ywcdy4t13i.execute-api.us-east-1.amazonaws.com/dev/qna';
        const backendResponse = await fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: userMessage
            })
        });
        console.log("Backend response", backendResponse);
        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            console.error("Backend error details:", backendResponse.status, errorText);
            throw new Error(`Backend error: ${backendResponse.status} - ${errorText}`);
        }
        const backendData = await backendResponse.json();
        console.log("Backend data:", backendData);
        // Parse the body if it's a string
        let responseContent = "No response received";
        if (backendData.body) {
            try {
                const parsedBody = JSON.parse(backendData.body);
                responseContent = parsedBody.response || parsedBody.output || parsedBody.answer;
            } catch (parseError) {
                console.error("Error parsing backend body:", parseError);
                responseContent = backendData.body; // Use raw body if parsing fails
            }
        } else if (backendData.output || backendData.response || backendData.answer) {
            responseContent = backendData.output || backendData.response || backendData.answer;
        }
        // Return simple JSON response
        return new Response(JSON.stringify({
            id: Date.now().toString(),
            role: "assistant",
            content: responseContent
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("API error:", error);
        return new Response(JSON.stringify({
            id: Date.now().toString(),
            role: "assistant",
            content: "Sorry, I encountered an error while processing your request. Please try again."
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__48da3809._.js.map