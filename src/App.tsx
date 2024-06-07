import Navbar from './components/Navbar';
import { Card } from './components/Card';
import { BarcodeSequence } from './components/BarcodeSequence';

function App() {
  return (
    <div>
      <Navbar />
      <main className='mx-auto mt-12 max-w-7xl'>
        <section className='flex flex-col items-center gap-5 md:flex-row'>
          <Card prefix='K3R' buttonText='k300' imageId='kwika' />
          <Card prefix='N5' buttonText='Max' imageId='max' />
          <Card prefix='N86' buttonText='Max 2' imageId='max-2' />
        </section>

        <h3 className='px-5 mt-8 text-xl font-bold'>Negative test</h3>
        <section className='flex flex-col items-center gap-5 mt-5 md:flex-row'>
          <Card prefix='NEG' buttonText='NEGATIVE' imageId='neg' />
          <Card prefix='INV' buttonText='INVALID' imageId='invalid' />
          <Card prefix='TES' buttonText='TEST' imageId='test' />
        </section>

        <section>
          <h3 className='px-5 mt-8 text-xl font-bold'>
            Create Sequence - Code-128
          </h3>
          <BarcodeSequence />
        </section>
      </main>
    </div>
  );
}

export default App;
