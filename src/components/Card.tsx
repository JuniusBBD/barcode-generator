import React from 'react';
import { faker } from '@faker-js/faker';
import Barcode from 'react-barcode';
import { toPng } from 'html-to-image';

type CardProps = {
  imageId: string;
  buttonText: string;
  prefix: string;
};

export function generateSerialNumber(prefix: string) {
  const alphanumeric = faker.random.alphaNumeric;
  const part1 = alphanumeric(3).toUpperCase();
  const part2 = alphanumeric(3).toUpperCase();
  const part3 = alphanumeric(2).toUpperCase();

  return `${prefix}${part1} ${part2} ${part3}`.replace(/\s/g, '');
}

export function Card(props: CardProps) {
  const [value, setValue] = React.useState('');
  const ref = React.useRef<HTMLDivElement>(null);

  const handleGenerateBarcode = React.useCallback(() => {
    const value_ = generateSerialNumber(props.prefix);
    setValue(value_);
  }, []);

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
  }, [ref]);

  React.useEffect(() => {
    handleGenerateBarcode();
  }, [handleGenerateBarcode]);

  return (
    <>
      {/*<!-- Component: Basic card --> */}
      <div className='overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200'>
        <div className='p-6 space-y-5'>
          <div className='bg-white px-1 pb-1' ref={ref}>
            <p className='uppercase text-right z-50 text-black'>
              {props.buttonText}
            </p>
            <Barcode
              margin={0}
              height={50}
              // @ts-ignore
              text={`S/N: ${value}`}
              value={value}
            />
          </div>
          <div className='flex items-center'>
            <button
              onClick={handleGenerateBarcode}
              className='inline-flex items-center w-full justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded-full focus-visible:outline-none whitespace-nowrap bg-rose-500 hover:bg-rose-600 focus:bg-rose-700 disabled:cursor-not-allowed disabled:border-rose-300 disabled:bg-rose-300 disabled:shadow-none'
            >
              <span>Generate barcode</span>
            </button>
            <button
              onClick={onDownload}
              className='inline-flex h-12 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-6 text-sm font-medium tracking-wide text-rose-500 transition duration-300 hover:bg-rose-50 hover:text-rose-600 focus:bg-rose-100 focus:text-rose-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-rose-300 disabled:shadow-none disabled:hover:bg-transparent'
            >
              <span className='relative only:-mx-6'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  role='graphics-symbol'
                  aria-labelledby='title-77 desc-77'
                >
                  <title id='title-77'>Icon title</title>
                  <desc id='desc-77'>
                    A more detailed description of the icon
                  </desc>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      {/*<!-- End Basic card --> */}
    </>
  );
}
