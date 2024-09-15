import { Card } from "flowbite-react";
import webImage from '../assets/web.jpg';
import devImage from '../assets/dev.jpg';
import dImage from '../assets/image.jpg';

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7 animate-pulse">
            DAVINCI IT SOLUTIONS
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <div className="flex justify-center">
              <svg
                className="animate-bounce w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p>
              Bienvenue chez DAVINCI IT SOLUTIONS, où l'innovation rencontre l'excellence dans le monde numérique. Nous sommes spécialisés dans la fourniture de solutions numériques sur mesure pour répondre aux besoins uniques de nos clients. Que ce soit pour le développement de logiciels, la transformation numérique ou la création de plateformes web, notre équipe d'experts est dédiée à vous accompagner à chaque étape de votre projet.
            </p>

            {/* Cartes affichées horizontalement avec animations */}
            <div className="flex flex-row items-center justify-center gap-6 mt-10">
              <Card
                className="w-72 h-96 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
              >
                <img
                  src={devImage}
                  alt="Solutions numériques sur mesure"
                  className="w-full h-56 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-4">
                  Développement de logiciels de pointe
                </h5>
              </Card>
              <Card
                className="w-72 h-96 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
              >
                <img
                  src={dImage}
                  alt="Transformation numérique"
                  className="w-full h-56 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-4">
                  Transformation numérique
                </h5>
              </Card>
              <Card
                className="w-72 h-96 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
              >
                <img
                  src={webImage}
                  alt="Création de plateformes web"
                  className="w-full h-56 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-4">
                  Création de plateformes web
                </h5>
              </Card>
            </div>

            <p>
              Chez DAVINCI IT SOLUTIONS, nous croyons que la technologie doit être un outil puissant pour la croissance et le succès. Notre engagement à fournir des solutions innovantes et de haute qualité garantit que votre entreprise est toujours en avance.
            </p>
            <p>
              Nous vous invitons à explorer nos services et à découvrir comment nous pouvons transformer vos ambitions numériques en réalité. Ensemble, créons un avenir où la technologie permet à votre entreprise de prospérer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
