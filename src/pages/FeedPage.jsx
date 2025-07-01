import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import AuthModal from "../components/AuthModal/AuthModal";
import { useNavigate } from "react-router-dom";

const initialPosts = [
  {
    id: 1,
    name: "Theresa Webb",
    avatar: "https://placehold.co/40x40/f0f0f0/333333?text=TW",
    time: "3 mins ago",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    name: "John Doe",
    avatar: "https://placehold.co/40x40/f0f0f0/333333?text=JD",
    time: "5 mins ago",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    name: "Jane Doe",
    avatar: "https://placehold.co/40x40/f0f0f0/333333?text=JD",
    time: "9 mins ago",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

function getInitials(email) {
  if (!email) return "U";
  const name = email.split("@")[0];
  const parts = name.split(/[._-]/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

const FeedPage = () => {
  const { user, setUser } = useAuth();
  const [posts, setPosts] = useState(initialPosts);
  const [postContent, setPostContent] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const navigate = useNavigate();

  const handleAlert = () => {
    if (!user) {
      setAuthModalOpen(true);
      setAuthMode("signin");
      return;
    }
    alert("function not implemented");
  };

  const handleInputFocus = () => {
    if (!user) {
      setAuthModalOpen(true);
      setAuthMode("signin");
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!user) {
      setAuthModalOpen(true);
      setAuthMode("signin");
      return;
    }
    if (!postContent.trim()) return;
    setPublishing(true);
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        name: user.email,
        avatar: `https://placehold.co/40x40/6366f1/fff?text=${getInitials(user.email)}`,
        time: "just now",
        content: postContent,
      };
      setPosts([newPost, ...posts]);
      setPostContent("");
      setPublishing(false);
    }, 400);
  };

  const handleAuthSuccess = (userObj) => {
    setUser(userObj);
    setAuthModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-5 px-2">
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
        onSuccess={handleAuthSuccess}
      />
      {/* Header */}
      {/* <header className="w-full flex justify-between items-center py-4 px-4 sm:px-0">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-lg font-semibold text-gray-800">foo-rum</span>
        </div>
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm">
                  {getInitials(user.email)}
                </span>
                <span className="text-gray-800 font-medium text-sm">{user.email}</span>
              </div>
            </>
          ) : (
            <>
              <button
                className="text-gray-700 font-medium hover:text-indigo-600 transition duration-150 ease-in-out"
                onClick={() => {
                  navigate('/signin');
                }}
              >
                Login
              </button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </>
          )}
        </div>
      </header> */}
      <div className="absolute top-6 left-6 flex items-center space-x-2 z-10">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
  <span className="text-lg font-semibold text-gray-800">foo-rum</span>
</div>

{/* Top right user or login */}
<div className="absolute top-6 right-6 z-10">
  {user ? (
    <div className="flex items-center space-x-2">
      <span className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm">
        {getInitials(user.email)}
      </span>
      <span className="text-gray-800 font-medium text-sm">{user.email}</span>
    </div>
  ) : (
    <button
      className="text-gray-700 font-medium hover:text-indigo-600 transition duration-150 ease-in-out"
      onClick={() => navigate('/signin')}
    >
      Login
    </button>
  )}
</div>

      <main className="w-full max-w-2xl mt-8 space-y-6">
        {/* Post Creation Area */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
            <div className="flex items-center space-x-2">
              {/* Paragraph Dropdown */}
              <button className="flex items-center px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition duration-150 ease-in-out" onClick={handleAlert}>
                Paragraph
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Formatting Buttons */}
              <div className="flex space-x-1">
                <button className="p-1 rounded hover:bg-gray-100 text-gray-600 transition duration-150 ease-in-out" onClick={handleAlert}>
                  {/* Bold Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10H8v4h6a2 2 0 002-2V8a2 2 0 00-2-2h-4a2 2 0 00-2 2v2h4" />
                  </svg>
                </button>
                <button className="p-1 rounded hover:bg-gray-100 text-gray-600 transition duration-150 ease-in-out" onClick={handleAlert}>
                  {/* Italic Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 5l4 14m-4-14l-4 14m8-14l4 14" />
                  </svg>
                </button>
                <button className="p-1 rounded hover:bg-gray-100 text-gray-600 transition duration-150 ease-in-out" onClick={handleAlert}>
                  {/* Underline Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M4 18h16M4 6h16" />
                  </svg>
                </button>
                <button className="p-1 rounded hover:bg-gray-100 text-gray-600 transition duration-150 ease-in-out" onClick={handleAlert}>
                  {/* List Icon (Unordered) */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button className="p-1 rounded hover:bg-gray-100 text-gray-600 transition duration-150 ease-in-out" onClick={handleAlert}>
                  {/* List Icon (Ordered) */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                </button>
              </div>
              {/* Character Count */}
              <span className="text-gray-500 text-sm ml-2">{postContent.length}</span>
              {/* Code Block Icon */}
              <button className="p-1 rounded hover:bg-gray-100 text-gray-600 transition duration-150 ease-in-out" onClick={handleAlert}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </button>
            </div>
            {/* Delete Icon */}
            <button className="p-1 rounded hover:bg-red-100 text-red-500 transition duration-150 ease-in-out" onClick={handleAlert}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          {/* Text Area and Send Button in Form */}
          <form onSubmit={handlePublish} className="flex flex-col space-y-3 mb-3">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <textarea
                className="w-full p-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 resize-none"
                rows={3}
                placeholder="How are you feeling today?"
                value={postContent}
                onChange={e => setPostContent(e.target.value)}
                onFocus={handleInputFocus}
                disabled={publishing}
              ></textarea>
            </div>
            {/* Bottom Bar with Send Button */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
              <div className="flex space-x-3">
                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition duration-150 ease-in-out" onClick={handleAlert} type="button">
                  {/* Plus Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition duration-150 ease-in-out" onClick={handleAlert} type="button">
                  {/* Microphone Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-14 0v-1a7 7 0 0114 0v1z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3m-3-3h6" />
                  </svg>
                </button>
                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition duration-150 ease-in-out" onClick={handleAlert} type="button">
                  {/* Camera Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              {/* Send Button */}
              <button
                type="submit"
                className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-60"
                disabled={publishing || !postContent.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Post List */}
        <div className="space-y-4 mt-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
              <div className="flex items-center space-x-3 mb-2">
                <img src={post.avatar} alt={post.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-800">{post.name}</p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex space-x-4 text-gray-500">
                <button className="flex items-center space-x-1 hover:text-red-500" onClick={handleAlert}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span></span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-500" onClick={handleAlert}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span></span>
                </button>
                <button className="flex items-center space-x-1 hover:text-green-500" onClick={handleAlert}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.882 13.07 9 12.736 9 12c0-.736-.118-1.07-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.552 4.034M9 11a3 3 0 100-6 3 3 0 000 6zm7.342 1.342L17.342 12m-2.684 0a3 3 0 110-2.684m0 2.684l-6.552 4.034m7.342-7.342A3 3 0 1112 12h.01" />
                  </svg>
                  <span></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FeedPage; 