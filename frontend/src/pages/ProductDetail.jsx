import BackButton from "../components/BackButton";
import Star from "../components/Star";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getProductsByIdThunks } from "../redux/thunks/productsThunk";
import { addToCart } from "../redux/slices/userSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.detailproduct);
  const loading = useSelector((state) => state.product.productLoading);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (!id) return;
    dispatch(getProductsByIdThunks(id));
  }, []);

  useEffect(() => {
    if (product && product?.images?.length > 0) {
      setActiveImage(product?.images[0]);
    }
  }, [product]);
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (    
    <div className="p-8 md:p-14 md:px-32 flex flex-col gap-5 min-h-screen mb-10">
      <div className="mt-8 flex flex-col justify-between">
         <div className="pb-10">
            <BackButton/>
         </div>
        <div>
          <h1 className="text-xl md:text-4xl font-semibold">{product.title}</h1>
          <p className="text-gray-400">{product.category}</p>
        </div>
      </div>
      <div className="flex flex-col  gap-5 md:min-h-screen md:-mb-44">
        <div className="h-full md:h-[500px] flex flex-col w-full  md:grid grid-cols-5 gap-10 md:gap-5">
          <div className="h-full w-full col-span-4 ">
            <img
              src={`http://localhost:3000/${activeImage}`}
              className="w-full h-96 md:h-[520px] rounded-xl object-fill"
              alt=""
            />
          </div>
          <div className="md:h-full md:w-40 w-full  col-span-1 md:flex flex-row  md:flex-col  ">
            <div className="flex  flex-row md:flex-col gap-2 items-start px-1 justify-start md:h-[520px]  col-span-2 overflow-hidden  md:overflow-y-scroll">
              {product.images?.map((img, indx) => (
                <button
                  onClick={() => setActiveImage(img)}
                  key={indx}
                  className={`${
                    img === activeImage ? "border-3 border-black" : ""
                  } rounded-md cursor-pointer overflow-hidden`}
                >
                  <img
                    src={`http://localhost:3000/${img}`}
                    className="rounded-md h-32 w-32 hover:scale-125 transition-all duration-300"
                    alt=""
                  />
                </button>
              ))}
            </div>
            {/* <img className="h-40 w-full rounded-xl" src="/mumbai.png" alt="" />
            <img className="h-40 w-full rounded-xl" src="/mumbai.png" alt="" /> */}
          </div>
        </div>
      </div>
      <div className=" w-full py-2 h-screen  flex flex-col  gap-2 md:grid grid-cols-5 ">
        <div className=" w-full h-full py-2 col-span-3 md:mr-10 md:pr-28 flex flex-col gap-5">
             <div className="w-full h-full ">
                <div className="flex h-full py-2 pb-3 flex-col  gap-3">
                    <h1 className="text-md text-2xl font-semibold">{product?.title}</h1>
                    <div className="flex">
                        <Star/>
                        <Star/>
                        <Star/>
                    </div>
                    <div className="flex ">
                        <p>Base Price:</p>
                        <div className="flex items-center"><i className="fa-solid fa-indian-rupee-sign"></i><p>{product?.price}</p></div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={()=> dispatch(addToCart(product))} className="bg-purple-primary flex items-center p-2 rounded-md text-white cursor-pointer">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <p className="text-sm">Add to cart</p>
                        </button>
                        <button className="bg-purple-secondry p-2 rounded-md px-5 text-purple-primary text-sm cursor-pointer">Buy now</button>
                        {/* <button className="border p-2 rounded-md border-gray-300"><i className="fa-regular fa-heart"></i></button> */}
                    </div>
                    <button className="bg-slate-200 w-96 p-2 rounded-md flex items-center justify-center gap-2 text-sm border border-purple-primary cursor-pointer">
                       <i className="fa-solid fa-pen"></i>
                        <p>Write a review</p>
                    </button>
                  
                </div>
            </div>
          {/* Description */}
          <div className="space-y-3 flex h-full flex-col justify-center items-center md:items-start border-b border-gray-300 pb-5">
            <h1 className="text-3xl">Description</h1>
            <p className="">{product.description}</p>
          </div>
          {/* Hosted */}
          <div className="space-y-5 border-b border-gray-300 pb-5">
            <h1 className="text-3xl">Hosted</h1>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>
                  <img
                    src="/profile.png"
                    className="h-10 w-10 rounded-full"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-xl">Samir warsi</h1>
                  <p>12345</p>
                </div>
              </div>
              <Link
                href={`/contact/`}
                className="border border-gray-400 px-7 py-2 rounded-full cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
