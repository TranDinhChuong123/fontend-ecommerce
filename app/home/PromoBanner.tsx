'use client'

interface Props {
  label: string,
  color: string
}

const PromoBanner: React.FC<Props> = ({ color, label }) => {
  return (
    <div className={`w-full ${color} py-6 my-10 text-center text-blue-600 font-semibold text-lg`}>
      🌟 {label}🌟
    </div>
  );
};

export default PromoBanner;
