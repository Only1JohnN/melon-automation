import { formatBytes } from "@/lib/format";
import type { Artifact, ResolvedArtifacts } from "@/lib/artifacts";

const ICONS = {
  screenshot: "📷",
  video: "🎥",
  trace: "🔍",
} as const;

const tileBase = "rounded-xl border p-4";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-2 rounded-md border border-slate-600 bg-slate-800 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-300">
      {children}
    </span>
  );
}

function ArtifactTile({ artifact }: { artifact: Artifact }) {
  const title = (
    <p className="font-medium">
      {ICONS[artifact.kind]} {artifact.label}
      {artifact.technicalOnly && <Badge>Technical only</Badge>}
    </p>
  );

  if (artifact.disabled) {
    return (
      <div
        aria-disabled="true"
        title="Disabled for now"
        className={`${tileBase} cursor-not-allowed border-slate-800 bg-slate-900/40 opacity-60`}
      >
        {title}
        <p className="mt-1 text-xs text-slate-400">Disabled for now</p>
      </div>
    );
  }

  if (!artifact.available) {
    return (
      <div className={`${tileBase} border-dashed border-slate-700 bg-slate-900/40`}>
        {title}
        <p className="mt-1 text-xs text-orange-300">Not available</p>
        <p className="mt-1 text-xs text-slate-500">
          The file wasn&apos;t found in the published reports.
        </p>
      </div>
    );
  }

  return (
    <a
      href={artifact.url!}
      target="_blank"
      rel="noopener noreferrer"
      className={`${tileBase} border-slate-700 hover:border-[#D6FF32]`}
    >
      {title}
      <p className="mt-1 text-xs text-slate-400">
        {artifact.format} • {artifact.size ? formatBytes(artifact.size) : "size unknown"}
      </p>
    </a>
  );
}

export default function ArtifactsCard({ artifacts }: { artifacts: ResolvedArtifacts }) {
  const tiles: Artifact[] = [
    ...artifacts.screenshots,
    ...artifacts.videos,
    ...(artifacts.trace ? [artifacts.trace] : []),
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
      <h3 className="mb-4 text-lg font-semibold">Artifacts</h3>

      {tiles.length === 0 ? (
        <p className="text-slate-400">No artifacts were captured for this test.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {tiles.map((artifact, index) => (
            <ArtifactTile key={`${artifact.kind}-${index}`} artifact={artifact} />
          ))}
        </div>
      )}
    </div>
  );
}
