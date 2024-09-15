import { Button } from 'flowbite-react';
import chiracImage from '../assets/chirac.jpg';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className="flex-1 justify-center flex flex-col">
        <h2 className='text-2xl'>
          Vous souhaitez améliorer votre stratégie digitale ?
        </h2>
        <p className='text-gray-500 my-2'>
          Découvrez nos solutions numériques sur mesure pour transformer votre entreprise.
        </p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
          <a href="https://davinci-solutions.com/solutions" target='_blank' rel='noopener noreferrer'>
            Découvrez DAVINCI Solutions
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        {/* <img src={chiracImage} alt="Chirac" className="w-32 h-32 object-cover" /> */}
      </div>
    </div>
  );
}
