import { Kid } from "@/types";

interface KidCardProps {
  kid: Kid;
  index: number;
}

const KID_COLORS = [
  "from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 border-green-200 dark:border-green-800",
  "from-blue-50 to-sky-50 dark:from-blue-950/40 dark:to-sky-950/40 border-blue-200 dark:border-blue-800",
  "from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/40 border-purple-200 dark:border-purple-800",
  "from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 border-amber-200 dark:border-amber-800",
  "from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 border-rose-200 dark:border-rose-800",
];

export default function KidCard({ kid, index }: KidCardProps) {
  const colorClass = KID_COLORS[index % KID_COLORS.length];

  return (
    <div
      className={`rounded-xl border bg-gradient-to-br ${colorClass} p-4 flex flex-col gap-1`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm leading-tight">
          {kid.name}
        </h3>
        {kid.birthYear && (
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 shrink-0">
            b. {kid.birthYear}
          </span>
        )}
      </div>
      {kid.note && (
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {kid.note}
        </p>
      )}
    </div>
  );
}
