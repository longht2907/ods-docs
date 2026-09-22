'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bot,
  BookOpen,
  Braces,
  ChevronDown,
  Cloud,
  ExternalLink,
  Folder,
  GitFork,
  Layers,
  Library,
  MoreHorizontal,
  PanelLeft,
} from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { useTreeContext } from 'fumadocs-ui/contexts/tree';
import { useDocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  FullSearchTrigger,
  SearchTrigger,
} from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import {
  buildDocsNavigation,
  findBestRouteMatch,
  type DocsNavigationIcon,
} from '@/lib/docs-navigation';
import { gitConfig } from '@/lib/shared';

const utilityLinks = [
  {
    title: 'Blog & Tin tức',
    description: 'Tin tức và kiến thức từ ODS',
    url: 'https://ods.vn/tin-tuc/',
  },
  {
    title: 'Hỗ trợ 24/7',
    description: 'Liên hệ đội ngũ hỗ trợ kỹ thuật',
    url: 'https://support.ods.vn',
  },
  {
    title: 'Cổng ODS ID',
    description: 'Quản lý tài khoản và dịch vụ',
    url: 'https://id.ods.vn',
  },
] as const;

function NavigationIcon({
  icon,
  className = 'size-4',
}: {
  icon: DocsNavigationIcon;
  className?: string;
}) {
  switch (icon) {
    case 'library':
      return <Library className={className} />;
    case 'bot':
      return <Bot className={className} />;
    case 'cloud':
      return <Cloud className={className} />;
    case 'book-open':
      return <BookOpen className={className} />;
    case 'braces':
      return <Braces className={className} />;
    default:
      return <Folder className={className} />;
  }
}

function focusMenuItem(
  menu: HTMLDivElement | null,
  direction: 'first' | 'last' | 'next' | 'previous',
) {
  if (!menu) return;

  const items = Array.from(
    menu.querySelectorAll<HTMLAnchorElement>('a[role="option"], a[role="menuitem"]'),
  );
  if (items.length === 0) return;

  const currentIndex = items.findIndex((item) => item === document.activeElement);
  let nextIndex = 0;

  if (direction === 'last') nextIndex = items.length - 1;
  if (direction === 'next') nextIndex = (currentIndex + 1) % items.length;
  if (direction === 'previous') {
    nextIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
  }

  items[nextIndex]?.focus();
}

export function TopNav({ className, ...props }: ComponentProps<'header'>) {
  const pathname = usePathname();
  const { full: tree } = useTreeContext();
  const { slots } = useDocsLayout();
  const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
  const navigation = useMemo(() => buildDocsNavigation(tree), [tree]);
  const activeSolution =
    findBestRouteMatch(pathname, navigation) ?? navigation[0];
  const activeSection = activeSolution
    ? findBestRouteMatch(pathname, activeSolution.sections)
    : undefined;
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [utilityOpen, setUtilityOpen] = useState(false);
  const solutionRootRef = useRef<HTMLDivElement>(null);
  const utilityRootRef = useRef<HTMLDivElement>(null);
  const solutionButtonRef = useRef<HTMLButtonElement>(null);
  const utilityButtonRef = useRef<HTMLButtonElement>(null);
  const tabsRef = useRef<HTMLElement>(null);
  const activeTabRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setSolutionOpen(false);
    setUtilityOpen(false);
  }, [pathname]);

  useEffect(() => {
    const tabs = tabsRef.current;
    const activeTab = activeTabRef.current;
    if (!tabs || !activeTab) return;

    tabs.scrollLeft = Math.max(
      0,
      activeTab.offsetLeft - (tabs.clientWidth - activeTab.clientWidth) / 2,
    );
  }, [activeSection?.url]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (!solutionRootRef.current?.contains(target)) setSolutionOpen(false);
      if (!utilityRootRef.current?.contains(target)) setUtilityOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;

      if (solutionOpen) {
        setSolutionOpen(false);
        solutionButtonRef.current?.focus();
      }
      if (utilityOpen) {
        setUtilityOpen(false);
        utilityButtonRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [solutionOpen, utilityOpen]);

  function openMenuFromKeyboard(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    menu: 'solution' | 'utility',
  ) {
    if (event.key !== 'ArrowDown') return;
    event.preventDefault();

    if (menu === 'solution') {
      setSolutionOpen(true);
      setUtilityOpen(false);
      requestAnimationFrame(() =>
        focusMenuItem(solutionRootRef.current, 'first'),
      );
    } else {
      setUtilityOpen(true);
      setSolutionOpen(false);
      requestAnimationFrame(() =>
        focusMenuItem(utilityRootRef.current, 'first'),
      );
    }
  }

  function handleMenuNavigation(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusMenuItem(event.currentTarget, 'next');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusMenuItem(event.currentTarget, 'previous');
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusMenuItem(event.currentTarget, 'first');
    } else if (event.key === 'End') {
      event.preventDefault();
      focusMenuItem(event.currentTarget, 'last');
    }
  }

  const SidebarTrigger = slots.sidebar.trigger;

  return (
    <header
      {...props}
      className={`ods-docs-header sticky top-0 z-40 border-b border-fd-border/70 bg-fd-background/95 backdrop-blur-md ${className ?? ''}`}
    >
      <div className="flex h-14 min-w-0 items-center gap-2 px-3 sm:gap-3 sm:px-5 lg:px-7">
        <Link
          href="/docs"
          className="group hidden shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring sm:flex"
          aria-label="ODS Docs — Trung tâm tài liệu"
        >
          <span className="grid size-8 place-items-center rounded-lg border border-fd-primary/20 bg-fd-primary/10 text-fd-primary transition-colors group-hover:bg-fd-primary/15">
            <Layers className="size-4" />
          </span>
          <span className="hidden font-semibold tracking-tight text-fd-foreground sm:inline">
            ODS Docs
          </span>
        </Link>

        <div className="relative min-w-0" ref={solutionRootRef}>
          <button
            ref={solutionButtonRef}
            type="button"
            aria-expanded={solutionOpen}
            aria-haspopup="listbox"
            aria-controls="ods-solution-menu"
            onClick={() => {
              setSolutionOpen((open) => !open);
              setUtilityOpen(false);
            }}
            onKeyDown={(event) => openMenuFromKeyboard(event, 'solution')}
            className="flex h-9 max-w-[55vw] items-center gap-2 rounded-lg border border-fd-border bg-fd-secondary/45 px-2.5 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring sm:max-w-72"
          >
            {activeSolution ? (
              <NavigationIcon
                icon={activeSolution.icon}
                className="size-4 shrink-0 text-fd-primary"
              />
            ) : null}
            <span className="truncate">
              {activeSolution?.title ?? 'Tài liệu ODS'}
            </span>
            <ChevronDown
              className={`size-3.5 shrink-0 text-fd-muted-foreground transition-transform ${solutionOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {solutionOpen ? (
            <div
              id="ods-solution-menu"
              role="listbox"
              aria-label="Chọn vùng tài liệu"
              onKeyDown={handleMenuNavigation}
              className="absolute start-0 top-full mt-2 w-[min(21rem,calc(100vw-1.5rem))] rounded-xl border border-fd-border bg-fd-popover p-1.5 text-fd-popover-foreground shadow-xl"
            >
              {navigation.map((solution) => {
                const selected = solution.url === activeSolution?.url;
                return (
                  <Link
                    key={solution.url}
                    href={solution.url}
                    role="option"
                    aria-selected={selected}
                    className="group flex items-start gap-3 rounded-lg px-2.5 py-2.5 outline-none transition-colors hover:bg-fd-accent focus-visible:bg-fd-accent aria-selected:bg-fd-primary/10"
                  >
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md border border-fd-border bg-fd-secondary text-fd-muted-foreground group-aria-selected:border-fd-primary/25 group-aria-selected:bg-fd-background group-aria-selected:text-fd-primary">
                      <NavigationIcon icon={solution.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-fd-foreground">
                        {solution.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 text-fd-muted-foreground">
                        {solution.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="min-w-0 flex-1" />

        <FullSearchTrigger
          hideIfDisabled
          className="hidden h-9 min-w-40 lg:inline-flex"
        />
        <SearchTrigger
          hideIfDisabled
          className="hidden size-9 rounded-lg sm:inline-flex lg:hidden"
        />

        <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden size-9 items-center justify-center rounded-lg text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring sm:inline-flex"
            aria-label="Mở GitHub repository"
          >
            <GitFork className="size-4" />
          </a>

        <div className="relative" ref={utilityRootRef}>
          <button
            ref={utilityButtonRef}
            type="button"
            aria-expanded={utilityOpen}
            aria-haspopup="menu"
            aria-controls="ods-utility-menu"
            onClick={() => {
              setUtilityOpen((open) => !open);
              setSolutionOpen(false);
            }}
            onKeyDown={(event) => openMenuFromKeyboard(event, 'utility')}
            className="grid size-9 place-items-center rounded-lg border border-fd-border bg-fd-secondary/40 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring sm:border-transparent sm:bg-transparent"
            aria-label="Mở liên kết tiện ích"
          >
            <MoreHorizontal className="size-4" />
          </button>

          {utilityOpen ? (
            <div
              id="ods-utility-menu"
              role="menu"
              aria-label="Liên kết tiện ích"
              onKeyDown={handleMenuNavigation}
              className="absolute end-0 top-full mt-2 w-72 rounded-xl border border-fd-border bg-fd-popover p-1.5 text-fd-popover-foreground shadow-xl"
            >
              <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none hover:bg-fd-accent focus-visible:bg-fd-accent sm:hidden"
                >
                  <GitFork className="size-4 text-fd-muted-foreground" />
                  GitHub
                  <ExternalLink className="ms-auto size-3 text-fd-muted-foreground" />
                </a>
              {utilityLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className="group flex items-start gap-3 rounded-lg px-3 py-2.5 outline-none hover:bg-fd-accent focus-visible:bg-fd-accent"
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-fd-foreground">
                      {link.title}
                      <ExternalLink className="size-3 text-fd-muted-foreground" />
                    </span>
                    <span className="mt-0.5 block text-xs text-fd-muted-foreground">
                      {link.description}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <SidebarTrigger
          className="grid size-9 place-items-center rounded-lg border border-fd-border bg-fd-secondary/40 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring md:hidden"
          aria-label="Mở mục lục tài liệu"
        >
          <PanelLeft className="size-4" />
        </SidebarTrigger>
      </div>

      {activeSolution && activeSolution.sections.length > 1 ? (
        <nav
          ref={tabsRef}
          className="ods-context-tabs flex h-11 items-end gap-1 overflow-x-auto px-3 sm:px-5 lg:px-7"
          aria-label={`Điều hướng ${activeSolution.title}`}
        >
          {activeSolution.sections.map((section) => {
            const selected = section.url === activeSection?.url;
            return (
              <Link
                key={section.url}
                ref={selected ? activeTabRef : undefined}
                href={section.url}
                aria-current={selected ? 'page' : undefined}
                className="group relative flex h-11 shrink-0 items-center gap-2 px-3 text-sm font-medium text-fd-muted-foreground outline-none transition-colors hover:text-fd-foreground focus-visible:text-fd-foreground aria-[current=page]:text-fd-primary"
              >
                <NavigationIcon icon={section.icon} className="size-3.5" />
                {section.title}
                <span className="absolute inset-x-2 bottom-0 h-0.5 scale-x-0 rounded-full bg-fd-primary transition-transform group-aria-[current=page]:scale-x-100" />
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
