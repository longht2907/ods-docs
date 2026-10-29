'use client';

import { Dialog } from '@base-ui/react/dialog';
import { Search } from 'lucide-react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import styles from '@/app/(home)/home.module.css';

export function HomeSearchTrigger() {
  const { enabled, hotKey, dialogHandle } = useSearchContext();

  if (!enabled) return null;

  return (
    <Dialog.Trigger
      handle={dialogHandle}
      type="button"
      className={styles.heroSearch}
      data-home-search-trigger
      aria-label="Tìm sản phẩm, chức năng hoặc tài liệu"
    >
      <Search aria-hidden="true" />
      <span>Tìm sản phẩm, chức năng hoặc tài liệu…</span>
      <span className={styles.searchHotkey} aria-hidden="true">
        {hotKey.map((key, index) => <kbd key={index}>{key.display}</kbd>)}
      </span>
    </Dialog.Trigger>
  );
}
