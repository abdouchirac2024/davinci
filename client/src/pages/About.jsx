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
              Welcome to DAVINCI IT SOLUTIONS, where innovation meets excellence in the digital world. We specialize in providing customized digital solutions to meet the unique needs of our clients. Whether it's software development, digital transformation, or web platform creation, our team of experts is dedicated to guiding you through every step of your project.
            </p>

            {/* Cards displayed horizontally with animations */}
            <div className="flex flex-row items-center justify-center gap-6 mt-10">
              <Card
                className="w-72 h-96 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
              >
                <img
                  src={devImage}
                  alt="Custom digital solutions"
                  className="w-full h-56 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-4">
                  Cutting-edge Software Development
                </h5>
              </Card>
              <Card
                className="w-72 h-96 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
              >
                <img
                  src={dImage}
                  alt="Digital transformation"
                  className="w-full h-56 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-4">
                  Digital Transformation
                </h5>
              </Card>
              <Card
                className="w-72 h-96 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100"
              >
                <img
                  src={webImage}
                  alt="Web platform creation"
                  className="w-full h-56 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-4">
                  Web Platform Creation
                </h5>
              </Card>
            </div>

            <p>
              At DAVINCI IT SOLUTIONS, we believe that technology should be a powerful tool for growth and success. Our commitment to delivering high-quality, innovative solutions ensures that your business is always ahead of the curve.
            </p>
            <p>
              We invite you to explore our services and see how we can help turn your digital ambitions into reality. Together, let's create a future where technology empowers your business to thrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
