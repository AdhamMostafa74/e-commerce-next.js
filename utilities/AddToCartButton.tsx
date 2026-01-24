import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

const AddToCartButton = () => {
    const handleClick = () => {
        toast.success("Item added to cart!");
    };

    return (
        <button
            onClick={handleClick}
            className="
        flex items-center justify-center gap-2
        bg-blue-500 hover:bg-blue-600
        text-white font-medium w-full
        px-5 py-2.5 rounded-md  my-3
        transition-colors
      "
        >
            <FaShoppingCart size={14} />
            <span>Add To Cart</span>
        </button>
    );
};

export default AddToCartButton;
