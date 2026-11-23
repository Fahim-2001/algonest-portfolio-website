/** Sets one phrase of a heading in the accent colour (same family, per DESIGN.md). */
export function Accent({ text, accent }: { text: string; accent?: string }) {
  const at = accent ? text.indexOf(accent) : -1;
  if (!accent || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-accent-text">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}
