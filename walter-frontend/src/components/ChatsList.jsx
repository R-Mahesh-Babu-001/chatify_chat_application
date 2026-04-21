import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";
import { MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import CreateGroupModal from "./CreateGroupModal";

function ChatsList() {
  const {
    getMyChatPartners,
    chats,
    groups,
    websiteChats,
    getWebsiteChats,
    updateWebsiteChat,
    deleteWebsiteChat,
    getMyGroups,
    isUsersLoading,
    isWebsitesLoading,
    isGroupsLoading,
    setSelectedUser,
    chatFilter,
    isGroupModalOpen,
    setIsGroupModalOpen,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [search, setSearch] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingWebsite, setEditingWebsite] = useState(null);
  const [editName, setEditName] = useState("");
  const [editUrl, setEditUrl] = useState("");

  useEffect(() => {
    getMyChatPartners();
    getWebsiteChats();
    getMyGroups(); // Fetch groups as well
  }, [getMyChatPartners, getWebsiteChats, getMyGroups]);

  if (isUsersLoading && chatFilter === "all") return <UsersLoadingSkeleton />;
  if (isWebsitesLoading && chatFilter === "all") return <UsersLoadingSkeleton />;
  if (isGroupsLoading && chatFilter === "groups") return <UsersLoadingSkeleton />;

  // Filter Logic
  let displayItems = [];
  if (chatFilter === "groups") {
    displayItems = groups;
  } else {
    displayItems = [...websiteChats, ...chats];
  }

  // Search Filter
  displayItems = displayItems.filter(item => {
    const name = item.fullName || item.name;
    return name?.toLowerCase().includes(search.toLowerCase());
  });


  if (chatFilter === "groups" && displayItems.length === 0) {
    // Show "Create Group" prominent button if empty
  }

  const openEditModal = (item) => {
    setEditingWebsite(item);
    setEditName(item.name || item.fullName || "");
    setEditUrl(item.websiteUrl || "");
    setMenuOpenId(null);
  };

  const handleUpdateWebsite = async () => {
    if (!editingWebsite?._id) return;

    const updated = await updateWebsiteChat(editingWebsite._id, {
      name: editName,
      websiteUrl: editUrl,
    });

    if (updated) {
      setEditingWebsite(null);
    }
  };

  const handleDeleteWebsite = async (item) => {
    setMenuOpenId(null);
    await deleteWebsiteChat(item._id);
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0c0c] relative">
      {/* Search Bar (Optional enhancement, sticking to basic for now, handled by parent maybe or just simple list) */}

      {/* Create Group Button (Visible only in Groups tab) */}
      {chatFilter === "groups" && (
        <button
          onClick={() => setIsGroupModalOpen(true)}
          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#151515] transition-all border-b border-[#1a1a1a] text-[#e50914]"
        >
          <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center">
            <Plus className="w-6 h-6 text-[#e50914]" />
          </div>
          <span className="font-medium text-white">New Group</span>
        </button>
      )}

      {displayItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-[#9b9b9b] text-sm">
            {chatFilter === "groups" ? "No groups yet" : "No chats yet"}
          </p>
        </div>
      )}

      {displayItems.map((item) => {
        const isWebsite = item.type === "website";
        const isGroup = item.admin !== undefined;
        const name = isWebsite ? item.fullName : isGroup ? item.name : item.fullName;
        const image = item.profilePic || "/avatar.png";
        const isOnline = !isWebsite && !isGroup && onlineUsers.includes(item._id);
        const websiteSubtitle = item.websiteUrl
          ? item.websiteUrl.replace(/^https?:\/\//i, "")
          : "";

        return (
          <div
            key={item._id}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#151515] transition-all border-b border-[#1a1a1a]"
            onClick={() => setSelectedUser(item)}
          >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 h-12 rounded-full">
                <img src={isWebsite ? item.favicon || image : image} alt={name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[#f2f2f2] font-normal text-base truncate">{name}</h4>
              <p className="text-[#9b9b9b] text-sm truncate">
                {isWebsite ? websiteSubtitle : isGroup ? "Group" : isOnline ? "Online" : "Offline"}
              </p>
            </div>

            {isWebsite && (
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setMenuOpenId(menuOpenId === item._id ? null : item._id)}
                  className="rounded-md p-1 text-[#aebac1] hover:bg-[#1a1a1a] hover:text-white"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>

                {menuOpenId === item._id && (
                  <div className="absolute right-0 top-8 z-20 min-w-[140px] rounded-lg border border-[#1f1f1f] bg-[#0f0f0f] py-1 shadow-2xl">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#d5d5d5] hover:bg-[#1a1a1a]"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteWebsite(item)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#ff9d9d] hover:bg-[#1a1a1a]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {editingWebsite && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-[#1f1f1f] bg-[#0f0f0f] shadow-2xl">
            <div className="border-b border-[#1a1a1a] px-5 py-4">
              <h3 className="text-base font-semibold text-white">Edit Website Chat</h3>
            </div>

            <div className="space-y-3 px-5 py-4">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Custom name"
                className="w-full rounded-lg border border-[#1f1f1f] bg-[#131313] px-3 py-2 text-sm text-white placeholder-[#747474] outline-none transition focus:border-[#e50914]"
              />
              <input
                type="text"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-[#1f1f1f] bg-[#131313] px-3 py-2 text-sm text-white placeholder-[#747474] outline-none transition focus:border-[#e50914]"
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-[#1a1a1a] px-5 py-4">
              <button
                type="button"
                onClick={() => setEditingWebsite(null)}
                className="rounded-lg border border-[#2a2a2a] px-3 py-2 text-xs font-medium text-[#c7c7c7] hover:bg-[#151515]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateWebsite}
                className="rounded-lg bg-[#e50914] px-3 py-2 text-xs font-semibold text-white hover:bg-[#ff1f2b]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <CreateGroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
      />
    </div>
  );
}
export default ChatsList;
