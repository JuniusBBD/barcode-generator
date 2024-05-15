import { generateBarcode } from 'barcode-tool';
import React from 'react';
import { faker } from '@faker-js/faker';

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
  const handleGenerateBarcode = React.useCallback(() => {
    try {
      const value = generateSerialNumber(props.prefix);
      const payload = {
        elementId: props.imageId,
        value: value,
      };
      generateBarcode({
        ...payload,
        options: {
          format: 'CODE128',
          text: `S/N: ${value}`,
        },
      });
    } catch (error) {
      console.error('Error generating barcode:', error);
    }
  }, [props.imageId]);

  React.useEffect(() => {
    handleGenerateBarcode();
  }, [handleGenerateBarcode]);

  return (
    <>
      {/*<!-- Component: Basic card --> */}
      <div className='overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200'>
        <div className='p-6 space-y-5'>
          <div>
            <img
              src='/barcode.png'
              alt='Barcode'
              id={props.imageId}
              className='w-full h-36 object-cover'
            />
          </div>
          <button
            onClick={handleGenerateBarcode}
            className='inline-flex items-center w-full justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded-full focus-visible:outline-none whitespace-nowrap bg-rose-500 hover:bg-rose-600 focus:bg-rose-700 disabled:cursor-not-allowed disabled:border-rose-300 disabled:bg-rose-300 disabled:shadow-none'
          >
            <span>{props.buttonText}</span>
          </button>
        </div>
      </div>
      {/*<!-- End Basic card --> */}
    </>
  );
}
