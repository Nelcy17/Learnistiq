<<<<<<< HEAD
import toast from "react-hot-toast"; 
=======
import toast from "react-hot-toast"; // 👈 Important!
>>>>>>> e1b21ea (first commit)

export const getUserId = () => {
  const userData = localStorage.getItem("user");
  if (!userData) return null;
  const parsed = JSON.parse(userData);
  return parsed?.user?._id || null;
};

export const handleAddToCart = (course) => {
  const userId = getUserId();
  if (!userId) {
    toast.error("Please login to add courses to your cart!");
    return;
  }

  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  const alreadyExists = existingCart.some(item => item._id === course._id);
  if (alreadyExists) {
    toast("Course already in cart", { icon: "ℹ️" });
    return;
  }

  existingCart.push(course);
  localStorage.setItem("cart", JSON.stringify(existingCart));
  toast.success(`"${course.title}" added to your cart!`);

  // Redirect to cart page after a small delay
  setTimeout(() => {
<<<<<<< HEAD
    window.location.href = "/Cart";
=======
    window.location.href = "/cart";
>>>>>>> e1b21ea (first commit)
  }, 800);
};

export const handleBuyNow = (course) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const isAlreadyInCart = cart.some(item => item.title === course.title);
  if (!isAlreadyInCart) {
    cart.push(course);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  setTimeout(() => {
<<<<<<< HEAD
    window.location.href = "/Cart";
  }, 800);
};


=======
    window.location.href = "/cart";
  }, 800);
};

>>>>>>> e1b21ea (first commit)
