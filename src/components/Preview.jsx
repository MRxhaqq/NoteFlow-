import ReactMarkdown from "react-markdown";

export default function Preview({ content }) {
  return (
    <div className="flex flex-col h-full">
      {/* Pane label */}
      <div className="h-9 border-b border-border flex items-center px-4 shrink-0">
        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
          Preview
        </span>
      </div>

      {/* Rendered markdown */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div
          className="prose prose-sm max-w-none
            prose-headings:font-serif prose-headings:italic
            prose-headings:text-foreground
            prose-p:text-foreground/90 prose-p:leading-relaxed
            prose-strong:text-foreground prose-strong:font-semibold
            prose-em:text-foreground/80
            prose-code:text-primary prose-code:bg-secondary
            prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-code:font-mono prose-code:text-xs
            prose-pre:bg-secondary prose-pre:border prose-pre:border-border
            prose-pre:rounded-md
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
            prose-ul:text-foreground/90 prose-ol:text-foreground/90
            prose-li:text-foreground/90
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-hr:border-border
            dark:prose-invert"
        >
          <ReactMarkdown>
            {content || "*Nothing to preview yet.*"}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
