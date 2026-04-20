"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "motion/react";

const EmbedClient = ({ ownerId }: { ownerId: string }) => {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);
  const embedCode = `
    <script 
        src="${process.env.NEXT_PUBLIC_APP_URL}/chatbot.js" 
        data-owner-id="${ownerId}">
    </script>
    `.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Navbar — FIX 1: Added "flex" class */}
      <div className="sticky top-0 z-40 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 text-lg font-medium">
          <div
            className="text-lg font-semibold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Support <span className="text-zinc-400">AI</span>
          </div>
          <button
            className="px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition"
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="flex justify-center px-4 py-14">
        <motion.div
          className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold">Embed Chatbot</h1>

          {/* FIX 2: Replaced <p> with <div> to allow block children */}
          <div className="text-zinc-500 mt-1">
            Copy and paste the following code before <code>&lt;/body&gt;</code>:

            {/* FIX 3: Moved copy button inside the relative container */}
            <div className="relative bg-zinc-900 rounded-xl mt-4 p-4 text-sm font-mono mb-10">
              <pre className="overflow-x-auto text-white">{embedCode}</pre>
              <button
                className="absolute top-3 right-3 bg-white text-zinc-900 text-xs font-medium px-3 py-1 rounded-lg border border-zinc-300 hover:bg-zinc-100 transition"
                onClick={copyToClipboard}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <ol className="list-decimal list-inside text-zinc-500 text-sm space-y-2">
            <li>Copy the code above.</li>
            <li>
              Paste it before the closing <code>&lt;/body&gt;</code> tag in your
              HTML file.
            </li>
            <li>Save and deploy your changes.</li>
          </ol>

          <div className="mt-14">
            <h1 className="text-lg font-medium mb-2">Live Preview</h1>
            <p className="text-zinc-500 text-sm mb-6">
              This is a preview of how your embedded chatbot will appear on your
              website.
            </p>

            <div className="rounded-xl border border-zinc-300 bg-white shadow-md overflow-hidden">
              <div className="rounded-xl border border-zinc-300 bg-white shadow-md overflow-hidden">
                <div className="flex items-center gap-2 px-4 h-9 bg-zinc-100 border-b border-zinc-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-4 text-xs text-zinc-500">
                    Your-website.com
                  </span>
                </div>

                <div className="relative h-64 sm:h-72 p-6 text-zinc-400 text-sm">
                  Your website goes here...
                  <div className="absolute bottom-24 right-6 w-64 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden">
                    <div className="bg-black text-white text-xs px-3 py-2 flex justify-between items-center">
                      <span>Customer Support</span>
                      <span>✕</span>
                    </div>

                    <div className="p-3 space-y-2 bg-zinc-50">
                      <div className="bg-zinc-200 text-zinc-800 text-xs px-3 py-2 rounded-2xl w-fit">
                        Hi! How can I help you today?
                      </div>
                      <div className="bg-black text-xs text-white px-3 py-2 rounded-lg ml-auto w-fit">
                        What is the return policy?
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute bottom-6 right-6 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-sm cursor-pointer shadow-2xl"
                  >
                    🗨️
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmbedClient;