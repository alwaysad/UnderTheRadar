import Link from "next/link";
import Image from "next/image";

const Explore = () => {
  const imageContent = [
    {
      link: "/business/Art Shop",
      textfirst: "Discover the Art",
      textsecond: "Art Galleries",
      imageSrc: "/art5.jpg",
    },
    {
      link: "/business/Accomadation",
      textfirst: "Find your place",
      textsecond: "Hotels&Hostels",
      imageSrc: "/hotel.jpg",
    },
    {
      link: "/business/Restaurant",
      textfirst: "Explore local food",
      textsecond: "Restaurants",
      imageSrc: "/restaurant.jpg",
    },
    {
      link: "/business/Cultural Place",
      textfirst: "Discover the history",
      textsecond: "Cultural activities",
      imageSrc: "/culturalplace.jpg",
    },
  ];

  return (
    <>
      <div className="flex justify-center items-center my-7">
        <p className="text-4xl font-medium">Explore</p>
      </div>
      <div className="flex px-10 justify-center items-center flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 mt-4">
        {imageContent.map((item, index) => (
          <Link key={index} href={item.link}>
            <div className="relative object-cover group hover:cursor-pointer">
              <div className="absolute top-6 left-6 text-white">
                <p className="text-xl w-40">{item.textfirst}</p>
                <span className="font-bold text-2xl ">{item.textsecond}</span>
              </div>
              <Image
                alt={item.textsecond}
                src={item.imageSrc}
                width={500}
                height={500}
              ></Image>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Explore;
