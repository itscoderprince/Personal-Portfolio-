import type { ServiceType } from '../types';

const ServiceCard = ({ service }: { service: ServiceType }) => {
  return (
    <div className='flex items-start justify-between rounded-2xl border border-neutral-700 p-5 sm:p-8 hover:bg-zinc-900 transition-all duration-300 hover:border-primary relative'>
      <div>
        <h3 className='text-lg font-semibold  font-rubik text-white mb-1'>{service.title}</h3>
        <p className='text-neutral-300 font-mono justify-smart mb-3'>{service.desc}</p>
        <span className='text-sm lining-nums text-neutral-400 font-medium uppercase tracking-wide'>
          {service.projects}
        </span>
      </div>
      <div className='shrink-0'>{service.icon}</div>
    </div>
  );
};

export default ServiceCard;
