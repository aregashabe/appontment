import React from 'react';
import about from '../asset/about.png';

function About() {
  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="text-center mb-8">
        <p className="text-4xl font-bold text-gray-800">ABOUT <span className="text-blue-500">US</span></p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-8">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex">
          <img src={about} alt="About Us" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between">
          <div>
            <p className="text-lg text-gray-700 mb-4">
              We are a dedicated team of professionals committed to providing excellent healthcare solutions.
              Our goal is to make healthcare accessible and patient-friendly, offering a range of services to meet every individual's needs.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Our team includes experienced doctors across various specialties who are passionate about delivering the best care possible.
            </p>
          </div>
          <div>
            <b className="text-xl text-blue-500 mb-4 block">Our Vision</b>
            <p className="text-lg text-gray-700">
              We aim to be a trusted leader in healthcare, setting the standard for medical excellence. Our vision is to create a supportive environment
              where each patient receives personalized, high-quality care.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-12">
        <p className="text-3xl font-bold text-gray-800 text-center mb-8">
          Why <span className="text-blue-500">Choose Us</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="p-4 border border-gray-300 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300">
    <b className="text-2xl block mb-2">Efficiency</b>
    <p className="text-lg">
      Our streamlined processes ensure timely and efficient care. We minimize wait times and optimize our resources to serve you better.
    </p>
  </div>

  <div className="p-4 border border-gray-300 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300">
    <b className="text-2xl block mb-2">Convenience</b>
    <p className="text-lg">
      We offer a range of convenient services including online appointment booking, virtual consultations, and accessible locations.
    </p>
  </div>

  <div className="p-4 border border-gray-300 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300">
    <b className="text-2xl block mb-2">Personalization</b>
    <p className="text-lg">
      Each patient receives individualized care tailored to their unique needs, ensuring a compassionate and personal experience.
    </p>
  </div>
</div>

      </div>
    </div>
  );
}

export default About;
