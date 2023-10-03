import React from 'react';
import { useGetStartupConfig } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';
import myBottom from '~/components/videos/2023-energy-fair-TV-bottom01.png';

export default function Footer() {
  const { data: config } = useGetStartupConfig();
  const localize = useLocalize();

  return (
    <>
      <div className="hidden px-3 pb-1 pt-2 text-center text-xs text-black/50 dark:text-white/50 md:block md:px-4 md:pb-4 md:pt-3">
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          {/* {config?.appTitle || 'LibreChat'} v0.5.9 */}
        </a>
        {/* {' - '}. {localize('com_ui_pay_per_call')} */}
      </div>
      <div className="footer">
        <a
          href="https://908.ai"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >        
          <img src={myBottom} alt="Boosting your business processes with our AI expertise" className="" />
        </a>
    </div>
    </>
  );
}
