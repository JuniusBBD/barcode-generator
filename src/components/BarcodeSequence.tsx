import React from 'react';
import Barcode from 'react-barcode';
import { toPng } from 'html-to-image';

export function BarcodeSequence() {
  const [value, setValue] = React.useState('');
  const ref = React.useRef<HTMLDivElement>(null);
  const [generateBarcode, setGenerateBarcode] = React.useState(false);

  const onDownload = React.useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${value}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref, value]);

  return (
    <div>
      <div className='relative my-6'>
        <input
          id='id-b02'
          type='text'
          name='id-b02'
          placeholder='Data to encode in barcode'
          value={value}
          className='relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border-b outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400'
          onChange={(event) => setValue(event.target.value)}
        />
        <label
          htmlFor='id-b02'
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Data to encode in barcode
        </label>
      </div>

      <div className='flex items-center w-[200px] mb-3'>
        <button
          disabled={!value}
          onClick={() => setGenerateBarcode(true)}
          className='inline-flex items-center justify-center w-full h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded-full focus-visible:outline-none whitespace-nowrap bg-rose-500 hover:bg-rose-600 focus:bg-rose-700 disabled:cursor-not-allowed disabled:border-rose-300 disabled:bg-rose-300 disabled:shadow-none'
        >
          <span>Generate barcode</span>
        </button>
        <button
          onClick={onDownload}
          className='inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded justify-self-center whitespace-nowrap text-rose-500 hover:bg-rose-50 hover:text-rose-600 focus:bg-rose-100 focus:text-rose-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-rose-300 disabled:shadow-none disabled:hover:bg-transparent'
        >
          <span className='relative only:-mx-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='1.5'
              role='graphics-symbol'
              aria-labelledby='title-77 desc-77'
            >
              <title id='title-77'>Icon title</title>
              <desc id='desc-77'>A more detailed description of the icon</desc>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
              />
            </svg>
          </span>
        </button>
      </div>

      {generateBarcode && value && (
        <div className='overflow-hidden bg-white rounded shadow-md w-fit text-slate-500 shadow-slate-200'>
          <div className='px-1 pb-1 bg-white' ref={ref}>
            <p className='z-50 text-right text-black uppercase'>CODE-128</p>
            <Barcode
              margin={0}
              height={50}
              // @ts-ignore
              text={`${value}`}
              value={value}
            />
          </div>
        </div>
      )}
    </div>
  );
}
