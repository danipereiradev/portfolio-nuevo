interface Technology {
  name: string;
  icon?: string;
  description: string;
}

interface SEOTechnologiesProps {
  title: string;
  subtitle?: string;
  technologies: Technology[];
}

const SEOTechnologies = ({
  title,
  subtitle,
  technologies,
}: SEOTechnologiesProps) => {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            {title}
          </h2>
          {subtitle && (
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              {subtitle}
            </p>
          )}
        </div>

        <div className='max-w-6xl mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {technologies.map((tech, index) => (
            <div
              key={index}
              className='bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
            >
              {tech.icon && (
                <div className='text-4xl mb-3'>{tech.icon}</div>
              )}
              <h3 className='text-lg font-bold text-gray-900 mb-2'>
                {tech.name}
              </h3>
              <p className='text-sm text-gray-600'>{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOTechnologies;
