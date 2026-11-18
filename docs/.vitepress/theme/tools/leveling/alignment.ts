import { ref } from 'vue';
import type { Alignment } from './data';

// The alignment picked on the speed leveling page. <LevelingAlignment />
// sets it (and keeps it in the URL as ?align=); every <LevelingGear /> on the
// page reads it. Server rendering never changes it, so the built page shows
// the gear for every alignment.

export type AlignmentChoice = 'all' | Alignment;

export const alignmentChoice = ref<AlignmentChoice>('all');

export const alignmentLabels: Record<Alignment, string> = {
  good: 'Good',
  neutral: 'Neutral',
  evil: 'Evil'
};

/** "Good and neutral", "Evil": who an item is for, in words */
export function listAlignments(list: Alignment[]): string {
  const words = list.map(alignment => alignmentLabels[alignment].toLowerCase());
  const text = words.length > 1 ? `${words.slice(0, -1).join(', ')} and ${words.at(-1)}` : words[0];

  return text.charAt(0).toUpperCase() + text.slice(1);
}
