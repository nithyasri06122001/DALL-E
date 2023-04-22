import React, { useState, useEffect } from "react";
import { Loader, FormField, Card } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-xl uppercase text-[#6449ff]">{title}</h2>
  );
};

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeOut, setSearchTimeOut] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          setPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);
    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = posts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
        console.log(searchedResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="text-[32px] text-[#222328] font-extrabold ">
          The DALL-E Community Showcase
        </h1>
        <p className="text-[16px] text-[#666e75] max-w-[800px] mt-2">
          This place is to get the imaginative images and also it is easy to
          generate, we can also integrate
        </p>
      </div>
      <div className="mt-16 mb-3">
        <FormField
          LabelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search Posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {searchText && (
            <h2 className="font-medium text-xl text-[#666e75] mb-5">
              Showing results for
              <span className="text-[#222328]"> {searchText}</span>
            </h2>
          )}
        </>
      )}
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
        {searchText ? (
          <RenderCards
            data={searchedResults}
            title="Could not render the posts"
          />
        ) : (
          <RenderCards data={posts} title="NO POSTS FOUND" />
        )}
      </div>
    </section>
  );
};

export default Home;
