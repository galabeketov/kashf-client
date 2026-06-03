import Image from "next/image";
import blogsData from "../../../data/blogs";
import OptimizedImage from "@/components/shared/OptimizedImage";

const RelatedBlog = () => {
  return (
    <>
      {blogsData.slice(0, 4).map((item) => (
        <div className="col-lg-3 col-sm-6" key={item.id}>
          <a
            href={`/blog-details/${item.id}`}
            className="blogCard -type-2 d-block bg-white rounded-4 shadow-4"
          >
            <div className="blogCard__image">
              <OptimizedImage
                src={item.img}
                alt={item.title}
                sizes="(max-width: 576px) 100vw, 25vw"
                wrapperStyle={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div className="px-20 py-20">
              <h4 className="text-dark-1 text-18 fw-500">{item.title}</h4>
              <div className="text-light-1 text-15 lh-14 mt-10">
                {item.date}
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  );
};

export default RelatedBlog;
