const LoadingComponent: React.FC = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-xl font-medium text-gray-600">Đang tải...</p>
    </div>
);

export default LoadingComponent;
