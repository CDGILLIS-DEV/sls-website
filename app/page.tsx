// import Services from './components/Services';
import Hero from '../components/Hero';


export default function Home() {
  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen bg-light">
      <Hero/>

      {/* Stylish Section Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pb-20">
        <svg className="relative block w-full h-24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path d="M0,60L120,52C240,44,480,28,720,28C960,28,1200,44,1320,52L1440,60L1440,120L0,120Z" fill="#033F02"></path>
        </svg>
      </div>
    </section>
  );
}