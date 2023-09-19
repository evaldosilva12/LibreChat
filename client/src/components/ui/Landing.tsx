import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useDocumentTitle from '~/hooks/useDocumentTitle';
import SunIcon from '../svg/SunIcon';
import LightningIcon from '../svg/LightningIcon';
import CautionIcon from '../svg/CautionIcon';
import myVideo from '../videos/robot01.mp4';
import store from '~/store';
import { useLocalize } from '~/hooks';
import { useGetStartupConfig } from 'librechat-data-provider';

export default function Landing() {

  // MODIFICATION: Add a full-screen div that appears when the page loads and disappears when the button is clicked
  const [showIntro, setShowIntro] = useState(true);
  const hideIntroHandler = () => {
    setShowIntro(false);
  };  


  const { data: config } = useGetStartupConfig();
  const setText = useSetRecoilState(store.text);
  const conversation = useRecoilValue(store.conversation);
  const localize = useLocalize();
  // @ts-ignore TODO: Fix anti-pattern - requires refactoring conversation store
  const { title = localize('com_ui_new_chat') } = conversation || {};

  useDocumentTitle(title);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { innerText } = e.target as HTMLButtonElement;
    const quote = innerText.split('"')[1].trim();
    setText(quote);
  };

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto pt-0 text-sm dark:bg-gray-800">
      {showIntro && (
        <>
          {/* Video background */}
          <video 
            autoPlay 
            loop 
            muted 
            className="absolute top-0 left-0 w-full h-full object-cover z-103"
            src={myVideo}
          ></video>

          {/* Black overlay with 50% opacity */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-105"></div> 
        </>
      )}  
      {
        showIntro && (
            <div
                className={`fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center z-110 ${!showIntro ? "fade-out" : ""}`}
                >
                <h1 className="text-center text-5xl leading-[6rem] mb-8 cta neon">Want to chat with an AI model?</h1>
                {/* <button
                    onClick={hideIntroHandler}
                    className="bg-blue-500 text-white text-5xl py-[3rem] px-[5rem] pb-[3.5rem] rounded"
                >
                    Try Now
                </button> */}
                <button
                    onClick={hideIntroHandler}
                    class="glowing-btn">TRY NOW</button>
            </div>
        )
      }     
      <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:max-w-2xl md:flex-col lg:max-w-3xl">
        <h1
          id="landing-title"
          data-testid="landing-title"
          className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 md:mt-[10vh]"
        >
          {config?.appTitle || 'LibreChat'}
        </h1>
        <div className="items-start gap-3.5 text-center md:flex">
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <SunIcon />
              {localize('com_ui_examples')}
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;{localize('com_ui_example_quantum_computing')}&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;{localize('com_ui_example_10_year_old_b_day')}&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;{localize('com_ui_example_http_in_js')}&quot; →
              </button>
            </ul>
          </div>
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <LightningIcon />
              {localize('com_ui_capabilities')}
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                {localize('com_ui_capability_remember')}
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                {localize('com_ui_capability_correction')}
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                {localize('com_ui_capability_decline_requests')}
              </li>
            </ul>
          </div>
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <CautionIcon />
              {localize('com_ui_limitations')}
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                {localize('com_ui_limitation_incorrect_info')}
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                {localize('com_ui_limitation_harmful_biased')}
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
                {localize('com_ui_limitation_limited_2021')}
              </li>
            </ul>
          </div>
        </div>
        {/* {!showingTemplates && (
          <div className="mt-8 mb-4 flex flex-col items-center gap-3.5 md:mt-16">
            <button
              onClick={showTemplates}
              className="btn btn-neutral justify-center gap-2 border-0 md:border"
            >
              <ChatIcon />
              Show Prompt Templates
            </button>
          </div>
        )}
        {!!showingTemplates && <Templates showTemplates={showTemplates}/>} */}
        {/* <div className="group h-32 w-full flex-shrink-0 dark:border-gray-900/50 dark:bg-gray-800 md:h-48" /> */}
      </div>
    </div>
  );
}
