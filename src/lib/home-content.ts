import { source } from './source';

export type HomeInternalHref = `/docs${string}`;

export interface HomeSearchSuggestion {
  label: string;
  href: HomeInternalHref;
}

export interface HomeContentModel {
  searchSuggestions: readonly HomeSearchSuggestion[];
}

const searchSuggestions: readonly HomeSearchSuggestion[] = [
  {
    label: 'Tạo máy nhánh',
    href: '/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/tao-cau-hinh-may-nhanh',
  },
  {
    label: 'Webhook cuộc gọi',
    href: '/docs/ai-contact-center/user-guider-portal/04-thiet-lap-tong-dai/cai-dat/webhook-va-popup',
  },
  { label: 'Đồng bộ CloudFile', href: '/docs/cloudfile' },
] as const;

function validateInternalLinks(suggestions: readonly HomeSearchSuggestion[]) {
  for (const suggestion of suggestions) {
    if (!source.getPageByUrl(suggestion.href)) {
      throw new Error(`Home search suggestion không tồn tại trong public docs: ${suggestion.href}`);
    }
  }
}

export function getHomeContentModel(): HomeContentModel {
  validateInternalLinks(searchSuggestions);

  return {
    searchSuggestions,
  };
}
