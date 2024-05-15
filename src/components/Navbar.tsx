import { useState } from 'react';
import { Icon } from './Icon';

export default function Navbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <>
      {/*<!-- Component: Basic Navbar --> */}
      <header className='border-b-1 relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden'>
        <div className='relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]'>
          <nav
            aria-label='main navigation'
            className='flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700'
            role='navigation'
          >
            {/*      <!-- Brand logo --> */}
            <a
              id='WindUI'
              aria-label='WindUI logo'
              aria-current='page'
              className='flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1'
              href='javascript:void(0)'
            >
              <Icon />
              Barcode Generator
            </a>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${
                  isToggleOpen
                    ? 'visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 '
                    : ''
                }
              `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? 'true' : 'false'}
              aria-label='Toggle navigation'
            >
              <div className='absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform'>
                <span
                  aria-hidden='true'
                  className='absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300'
                ></span>
                <span
                  aria-hidden='true'
                  className='absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300'
                ></span>
                <span
                  aria-hidden='true'
                  className='absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300'
                ></span>
              </div>
            </button>
          </nav>
        </div>
      </header>
      {/*<!-- End Basic Navbar--> */}
    </>
  );
}
