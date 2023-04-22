import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, FormField } from "../components";
import { getRandomPrompt } from "../utils";
import { preview } from "../assets";

const CreatePosts = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please Enter The Prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });
        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter the details and generate the image");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSupriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  return (
    <section className="max-w-7xl max-auto ml-10 pl-10">
      <div>
        <h1 className="text-[32px] text-[#222328] font-extrabold ">Create</h1>
        <p className="text-[16px] text-[#666e75] max-w-[500px] mt-2">
          This is the create posts page where we create a posts
        </p>
      </div>
      <form className="mt-10 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            LabelName="Your Name"
            type="text"
            name="name"
            value={form.name}
            placeholder="Nithyasri"
            handleChange={handleChange}
          />
          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            value={form.prompt}
            placeholder={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handleSupriseMe={handleSupriseMe}
          />
          <div
            className="relative bg-gray-50 border border-gray-300
        text-gray-900 text-sm-rounded-lg focus:ring-blue-500
        focus:border-blue-500 w-96 p-3 h-96 flex justify-center items-center"
          >
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute z-0 inset-2 justify-center items-center bg-[rgba(0,0,0,0.5)] flex rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="bg-green-700 w-full text-white font-medium rounded-md text-sm px-5 py-2.5 text-center sm:w-auto"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text=[#666e75] text-[14px]">
            Once you have created your image,you can share your image with your
            community
          </p>
          <button
            type="submit"
            className="mt-3 bg-[#6469ff] w-full text-white font-medium rounded-md text-sm px-5 py-2.5 text-center sm:w-auto"
          >
            {loading ? "Sharing..." : "Share With Community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePosts;
