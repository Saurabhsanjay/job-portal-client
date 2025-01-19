interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative text-start space-y-4 py-8">
      {/* Diagonal Background */}
      <div className="absolute -top-6 -left-6 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 transform -rotate-12 rounded-lg pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-500 opacity-10 transform rotate-12 rounded-lg pointer-events-none"></div>

      {/* Title */}
      <h2 className="relative z-10 text-3xl sm:text-4xl font-semibold text-gray-800 tracking-tight">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="relative z-10 text-base sm:text-lg text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}
