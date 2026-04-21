import WebsiteChat from "../models/WebsiteChat.js";

const normalizeWebsiteUrl = (rawUrl) => {
  const trimmed = rawUrl?.trim();
  if (!trimmed) throw new Error("Website URL is required");

  const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(normalized);

  return {
    hostname: parsed.hostname,
    websiteUrl: parsed.toString(),
  };
};

const getFaviconUrl = (hostname) => `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(hostname)}`;

export const getWebsiteChats = async (req, res) => {
  try {
    const websiteChats = await WebsiteChat.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json(websiteChats);
  } catch (error) {
    console.error("Error in getWebsiteChats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createWebsiteChat = async (req, res) => {
  try {
    const { websiteUrl: rawUrl, name } = req.body;
    const { websiteUrl, hostname } = normalizeWebsiteUrl(rawUrl);

    const displayName = name?.trim() || hostname;
    const favicon = getFaviconUrl(hostname);

    const existing = await WebsiteChat.findOne({ userId: req.user._id, websiteUrl });
    if (existing) {
      if (name?.trim()) {
        existing.name = displayName;
      }
      existing.favicon = favicon;
      await existing.save();
      return res.status(200).json(existing);
    }

    const websiteChat = await WebsiteChat.create({
      userId: req.user._id,
      name: displayName,
      websiteUrl,
      favicon,
    });

    res.status(201).json(websiteChat);
  } catch (error) {
    if (error.message === "Website URL is required") {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof TypeError) {
      return res.status(400).json({ message: "Please enter a valid website URL" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid website chat data" });
    }

    console.error("Error in createWebsiteChat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateWebsiteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const { websiteUrl: rawUrl, name } = req.body;

    const existing = await WebsiteChat.findOne({ _id: id, userId: req.user._id });
    if (!existing) return res.status(404).json({ message: "Website chat not found" });

    if (rawUrl) {
      const { websiteUrl, hostname } = normalizeWebsiteUrl(rawUrl);
      existing.websiteUrl = websiteUrl;
      existing.favicon = getFaviconUrl(hostname);
      if (!name?.trim() && !existing.name?.trim()) {
        existing.name = hostname;
      }
    }

    if (name !== undefined) {
      const trimmedName = name.trim();
      if (!trimmedName) {
        return res.status(400).json({ message: "Name cannot be empty" });
      }
      existing.name = trimmedName;
    }

    await existing.save();

    res.status(200).json(existing);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(400).json({ message: "Please enter a valid website URL" });
    }

    if (error.code === 11000) {
      return res.status(409).json({ message: "This website already exists in your chats" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid website chat data" });
    }

    console.error("Error in updateWebsiteChat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteWebsiteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await WebsiteChat.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!deleted) return res.status(404).json({ message: "Website chat not found" });

    res.status(200).json({ message: "Website chat deleted" });
  } catch (error) {
    console.error("Error in deleteWebsiteChat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
