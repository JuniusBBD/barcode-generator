import Navbar from './components/Navbar';
import { Card } from './components/Card';

function App() {
  return (
    <div>
      <Navbar />
      <main className='max-w-7xl mt-12 mx-auto'>
        <section className='flex flex-col md:flex-row items-center gap-5'>
          <Card prefix='K3R' buttonText='k300' imageId='kwika' />
          <Card prefix='N5' buttonText='Max' imageId='max' />
          <Card prefix='N86' buttonText='Max 2' imageId='max-2' />
        </section>
      </main>
    </div>
  );
}

export default App;
