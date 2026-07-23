import { useState, useEffect } from 'react';

declare global {
  interface Window {
    Overedge?: {
      isReady: () => boolean;
      onReady: (cb: (config?: any) => void) => void;
      getContent: (type: string, params?: Record<string, unknown>) => Promise<any>;
      getConfig?: () => any;
    };
  }
}

export function useOveredge<T = any>(
  contentType: string,
  params: Record<string, unknown> = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const paramsKey = JSON.stringify(params || {});

  useEffect(() => {
    let cancelled = false;

    function fetchContent() {
      if (!window.Overedge?.getContent) {
        if (!cancelled) {
          setData([]);
          setLoading(false);
        }
        return;
      }
      window.Overedge.getContent(contentType, params)
        .then((res) => {
          if (!cancelled) {
            setData(Array.isArray(res) ? res : []);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (!cancelled) {
            setError(err instanceof Error ? err : new Error(String(err)));
            setData([]);
            setLoading(false);
          }
        });
    }

    if (typeof window === 'undefined') return;

    if (window.Overedge?.isReady()) {
      fetchContent();
    } else if (window.Overedge?.onReady) {
      window.Overedge.onReady(fetchContent);
    } else {
      const interval = setInterval(() => {
        if (window.Overedge?.isReady()) {
          clearInterval(interval);
          fetchContent();
        }
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        if (!cancelled && loading) {
          fetchContent();
        }
      }, 6000);

      return () => {
        cancelled = true;
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }

    return () => {
      cancelled = true;
    };
  }, [contentType, paramsKey]);

  return { data, loading, error };
}

let tokensApplied = false;

function applyThemeTokens(design: any) {
  if (!design || tokensApplied) return;
  tokensApplied = true;
  const root = document.documentElement;
  if (design.primary_color) {
    const color = design.primary_color;
    root.style.setProperty('--color-primary', color);
    root.style.setProperty('--primary', color);
    root.style.setProperty('--accent', color);

    const styleId = 'overedge-theme';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      :root {
        --color-primary: ${color};
        --primary: ${color};
      }
      .bg-primary { background-color: ${color} !important; }
      .text-primary { color: ${color} !important; }
      .border-primary { border-color: ${color} !important; }
      button.bg-primary,
      a.bg-primary { background-color: ${color} !important; }
    `;
  }
  if (design.font_heading) {
    root.style.setProperty('--font-heading', design.font_heading);
  }
  if (design.font_body) {
    root.style.setProperty('--font-body', design.font_body);
  }
}

export function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [configReady, setConfigReady] = useState(false);

  useEffect(() => {
    let done = false;

    const handleReady = (config: any) => {
      if (done) return;
      done = true;
      if (config?.site_config) {
        setSiteConfig(config.site_config);
        if (config.site_config.design) {
          applyThemeTokens(config.site_config.design);
        }
      }
      setConfigReady(true);
    };

    if (window.Overedge?.isReady()) {
      const cfg = window.Overedge.getConfig ? window.Overedge.getConfig() : null;
      handleReady(cfg);
    } else if (window.Overedge?.onReady) {
      window.Overedge.onReady(handleReady);
      const fallback = setTimeout(() => {
        if (!done) {
          done = true;
          setConfigReady(true);
        }
      }, 5000);
      return () => clearTimeout(fallback);
    } else {
      const fallback = setTimeout(() => {
        if (!done) {
          done = true;
          setConfigReady(true);
        }
      }, 2000);
      return () => clearTimeout(fallback);
    }
  }, []);

  const getSectionProps = (type: string) => {
    if (!siteConfig?.sections) return null;
    return siteConfig.sections.find((s: any) => s.type === type) || null;
  };

  const isSectionActive = (type: string) => {
    if (!siteConfig) return true; // free user — show all
    const section = getSectionProps(type);
    return section ? section.active : false;
  };

  const getSectionLimit = (type: string, defaultLimit = 6) => {
    const section = getSectionProps(type);
    return section?.props?.limit || defaultLimit;
  };

  return { siteConfig, configReady, getSectionProps, isSectionActive, getSectionLimit };
}
