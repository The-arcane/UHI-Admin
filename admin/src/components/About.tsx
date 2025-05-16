import React from 'react';
import { Stethoscope, Share2, Brain, Lock, Users } from 'lucide-react';

const Feature = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    <Icon className="w-12 h-12 text-blue-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">About UHI Open Healthcare</h1>
      
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Our Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature 
            icon={Share2}
            title="Open Interoperability"
            description="Seamless integration across different healthcare providers, applications, and systems"
          />
          <Feature 
            icon={Lock}
            title="Secure Digitization"
            description="Safe sharing of medical records between patients and healthcare providers"
          />
          <Feature 
            icon={Brain}
            title="AI Integration"
            description="AI-powered medical record summarization and clinical decision support"
          />
          <Feature 
            icon={Stethoscope}
            title="Teleconsultations"
            description="Enable remote healthcare services through an open network"
          />
          <Feature 
            icon={Users}
            title="Empowering Stakeholders"
            description="Improved efficiency, accessibility, and transparency for all healthcare participants"
          />
        </div>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4">About UHI Framework</h2>
        <p className="text-gray-700 mb-4">
          The Unified Health Interface (UHI) framework is transforming healthcare in India by creating an open, 
          interoperable network architecture. Similar to how UPI revolutionized financial services, UHI aims to 
          break down barriers in healthcare delivery and access.
        </p>
        <p className="text-gray-700 mb-6">
          Our platform leverages the UHI framework to create a comprehensive ecosystem that connects patients, 
          healthcare providers, government agencies, and researchers, fostering innovation and improving 
          healthcare outcomes for all.
        </p>
      </section>
    </div>
  );
}

export default About;