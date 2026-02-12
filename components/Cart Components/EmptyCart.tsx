const EmptyCart = () => {
    return (
        <div className="bg-slate-200 rounded-xl p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Your cart is empty 🛒
            </h2>
            <p className="text-gray-500 mb-6">
                Start adding products to see them here.
            </p>

            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Start Shopping
            </button>
        </div>
    );
};

export default EmptyCart;
