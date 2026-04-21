import { ArrowLeft, ExternalLink } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function WebsiteContainer() {
  const { selectedUser, setSelectedUser } = useChatStore();

  if (!selectedUser?.websiteUrl) return null;

  return (
    <div className="flex h-full w-full flex-col bg-[#0b0b0b]">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#1a1a1a] bg-[#0f0f0f]/90 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            className="text-[#7a7a7a] hover:text-white md:hidden"
            onClick={() => setSelectedUser(null)}
            aria-label="Back"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <img
            src={selectedUser.favicon || "/avatar.png"}
            alt={selectedUser.name || selectedUser.fullName || "Website"}
            className="h-8 w-8 rounded-full border border-[#222] bg-white object-cover"
          />
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-white md:text-base">{selectedUser.name || selectedUser.fullName}</h3>
            <p className="truncate text-[11px] text-[#8f8f8f] md:text-xs">{selectedUser.websiteUrl}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={selectedUser.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-[#2a2a2a] px-2.5 py-1.5 text-xs text-[#d6d6d6] hover:bg-[#161616]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open in browser
          </a>
        </div>
      </div>

      <div className="flex-1 bg-black p-2 md:p-3">
        <iframe
          title={selectedUser.fullName || "Website"}
          src={selectedUser.websiteUrl}
          className="h-full w-full rounded-xl border border-[#1a1a1a] bg-white"
          allow="camera; microphone; geolocation; clipboard-read; clipboard-write; fullscreen"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export default WebsiteContainer;
