import Link from 'next/link';

interface ButtonProps {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  primaryColor?: string;
}

export default function Button({ 
  label, 
  href, 
  variant = 'primary', 
  size = 'md',
  className,
  primaryColor = '#014b3c',
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'text-white font-semibold uppercase rounded-lg transition-colors hover:opacity-90',
    secondary: 'text-primary border-2 border-primary font-semibold uppercase rounded-lg transition-colors hover:bg-primary hover:text-white',
  };

  return (
    <Link 
      href={href}
      className={`${sizeClasses[size]} ${variantClasses[variant]} font-sans ${className || ''}`}
      style={variant === 'primary' ? { backgroundColor: primaryColor } : {}}
    >
      {label}
    </Link>
  );
}




