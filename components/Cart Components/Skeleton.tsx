const CartSkeleton = () => {
    return (
        <div className="bg-slate-200 rounded-xl p-4 space-y-4 animate-pulse">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg p-4 flex items-center gap-4"
                >
                    <div className="w-16 h-16 bg-gray-300 rounded-lg" />

                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4" />
                        <div className="h-4 bg-gray-300 rounded w-1/4" />
                    </div>

                    <div className="h-8 w-20 bg-gray-300 rounded-lg" />
                </div>
            ))}
        </div>
    );
};

export default CartSkeleton;
