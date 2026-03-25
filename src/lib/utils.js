import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateId() {
  return crypto.randomUUID();
}

export function extractTitle(content) {
  if (!content || content.trim() === "") return "Untitled";
  const firstLine = content.split("\n")[0];
  return firstLine.replace(/^#+\s*/, "").trim() || "Untitled";
}

export function getWordCount(content) {
  if (!content || content.trim() === "") return 0;
  return content.trim().split(/\s+/).filter(Boolean).length;
}

export function getReadingTime(content) {
  const words = getWordCount(content);
  const minutes = Math.ceil(words / 200);
  return minutes < 1 ? "< 1 min read" : `${minutes} min read`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const TAG_COLORS = [
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#EF4444",
  "#14B8A6",
  "#F97316",
];

export function getTagColor(tag) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

export function exportNote(note) {
  const content = `---
title: ${note.title || "Untitled"}
tags: ${note.tags.length > 0 ? note.tags.join(", ") : "none"}
created: ${new Date(note.createdAt).toLocaleString()}
updated: ${new Date(note.updatedAt).toLocaleString()}
---

${note.content}`;

  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const filename = (note.title || "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  a.download = `${filename}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
