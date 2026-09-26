'use client';

import Link from 'next/link';
import type { KeyboardEvent } from 'react';
import { useId, useRef, useState } from 'react';
import { Activity, ArrowRight, Code2, ShieldCheck, type LucideIcon } from 'lucide-react';
import type { HomeRoleGroup } from '@/lib/home-content';

interface RoleGuidesProps {
  groups: readonly HomeRoleGroup[];
}

const roleIcons: Record<HomeRoleGroup['id'], LucideIcon> = {
  admin: ShieldCheck,
  developer: Code2,
  operations: Activity,
};

export function RoleGuides({ groups }: RoleGuidesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId();
  const activeGroup = groups[activeIndex];

  if (!activeGroup) throw new Error('Home cần ít nhất một nhóm vai trò.');

  function activate(index: number) {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % groups.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + groups.length) % groups.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = groups.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    activate(nextIndex);
  }

  return (
    <div className="ods-role-explorer">
      <div className="ods-role-tabs" role="tablist" aria-label="Chọn vai trò sử dụng tài liệu">
        {groups.map((group, index) => {
          const RoleIcon = roleIcons[group.id];
          const selected = index === activeIndex;
          return (
            <button
              key={group.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              id={`${instanceId}-${group.id}-tab`}
              type="button"
              role="tab"
              tabIndex={selected ? 0 : -1}
              aria-selected={selected}
              aria-controls={`${instanceId}-${group.id}-panel`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <RoleIcon aria-hidden="true" />
              <span>{group.label}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${instanceId}-${activeGroup.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${instanceId}-${activeGroup.id}-tab`}
        className="ods-role-panel"
      >
        <div className="ods-role-intro">
          <span>{activeGroup.eyebrow}</span>
          <h3>{activeGroup.label}</h3>
          <p>{activeGroup.description}</p>
        </div>
        <div className="ods-role-links">
          {activeGroup.links.map((link, index) => (
            <Link key={link.href} href={link.href} className="group">
              <span className="ods-role-link-index">0{index + 1}</span>
              <span className="min-w-0 flex-1">
                <strong>{link.title}</strong>
                <small>{link.description}</small>
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
