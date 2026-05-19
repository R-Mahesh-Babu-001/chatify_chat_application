import { MessageSquarePlusIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import ActiveTabSwitch from "./ActiveTabSwitch";

function ProfileHeader() {
  const { activeTab, setIsWebsiteModalOpen, setSelectedUser, setActiveTab, setChatFilter } = useChatStore();

  const handleOpenWebsiteModal = () => {
    setSelectedUser(null);
    setActiveTab("chats");
    setChatFilter("all");
    setIsWebsiteModalOpen(true);
  };

  return (
    <div className="px-4 bg-[#0f0f0f] border-b border-[#1a1a1a] h-16 flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <h2 className="text-white font-medium text-2xl leading-none whitespace-nowrap">
            {activeTab === "chats" ? "Chats" : "Contacts"}
          </h2>
          <ActiveTabSwitch />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleOpenWebsiteModal}
            className="text-[#aebac1] hover:text-[#e50914] transition-colors"
            title="Add Website"
          >
            <MessageSquarePlusIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
