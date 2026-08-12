import { useState, useCallback } from 'react';
import type { Option } from './Dropdown';

export function useDropdown(initial?: string | null) {
  const [value, setValue] = useState<string | null>(initial ?? null);
  const onChange = useCallback((v: string) => setValue(v), []);
  return { value, onChange, setValue };
}
