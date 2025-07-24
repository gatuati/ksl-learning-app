import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const AdminDashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    type: "alphabet",
    videoFile: null,
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const [content, setContent] = useState({
    unit1: { alphabets: [], numbers: [] },
    unit2: { words: [] },
    unit3: { phrases: [] },
    quiz: [],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/content");
      setContent(response.data);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
  };

  const handleAddContent = () => {
    setModalType("add");
    setSelectedItem(null);
    setFormData({
      title: "",
      type: "alphabet",
      videoFile: null,
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setShowModal(true);
  };

  const handleEditContent = (item) => {
    setModalType("edit");
    setSelectedItem(item);
    setFormData({
      title: item.title,
      type: item.type,
      videoFile: null,
      options: item.options || ["", "", "", ""],
      correctAnswer: item.correctAnswer || "",
    });
    setShowModal(true);
  };

  const handleDeleteContent = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/content/${id}`);
        fetchContent();
      } catch (error) {
        console.error("Failed to delete content:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("type", formData.type);
    submitData.append("unit", activeTab);

    if (formData.videoFile) {
      submitData.append("video", formData.videoFile);
    }

    if (formData.type === "quiz") {
      submitData.append("options", JSON.stringify(formData.options));
      submitData.append("correctAnswer", formData.correctAnswer);
    }

    try {
      if (modalType === "add") {
        await axios.post("http://localhost:5000/api/admin/content", submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.put(`http://localhost:5000/api/admin/content/${selectedItem._id}`, submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowModal(false);
      fetchContent();
    } catch (error) {
      console.error("Failed to save content:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "users", name: "Users", icon: "👥" },
    { id: "content", name: "Content", icon: "📝" },
    { id: "analytics", name: "Analytics", icon: "📈" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">System Overview</h3>
            <p className="text-gray-600">
              Welcome to the admin dashboard. Here you can manage users, content, and view analytics.
            </p>
          </div>
        );
      case "users":
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">User Management</h3>
            <p className="text-gray-600">User management features will be available here.</p>
          </div>
        );
      case "content":
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Content Management</h3>
            <button
              onClick={handleAddContent}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Add New Content
            </button>
            <div className="space-y-8 mt-8">
              <ContentSection title="Alphabets" items={content.unit1.alphabets} onEdit={handleEditContent} onDelete={handleDeleteContent} />
              <ContentSection title="Numbers" items={content.unit1.numbers} onEdit={handleEditContent} onDelete={handleDeleteContent} />
              <ContentSection title="Words" items={content.unit2.words} onEdit={handleEditContent} onDelete={handleDeleteContent} />
              <ContentSection title="Phrases" items={content.unit3.phrases} onEdit={handleEditContent} onDelete={handleDeleteContent} />
              <ContentSection title="Quiz Questions" items={content.quiz} onEdit={handleEditContent} onDelete={handleDeleteContent} isQuiz />
            </div>
          </div>
        );
      case "analytics":
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Analytics</h3>
            <p className="text-gray-600">Analytics and reporting features will be available here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800">
              ← Back to Dashboard
            </Link>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Content</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
            <p className="text-3xl font-bold text-purple-600">1</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Quiz Attempts</h3>
            <p className="text-3xl font-bold text-red-600">0</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {modalType === "add" ? "Add New Content" : "Edit Content"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="alphabet">Alphabet</option>
                  <option value="number">Number</option>
                  <option value="word">Word</option>
                  <option value="phrase">Phrase</option>
                  <option value="quiz">Quiz</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFormData({ ...formData, videoFile: e.target.files[0] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {formData.type === "quiz" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Answer Options</label>
                    {formData.options.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...formData.options];
                          newOptions[index] = e.target.value;
                          setFormData({ ...formData, options: newOptions });
                        }}
                        placeholder={`Option ${index + 1}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                        required
                      />
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
                    <select
                      value={formData.correctAnswer}
                      onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select correct answer</option>
                      {formData.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  {modalType === "add" ? "Add Content" : "Update Content"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ContentSection = ({ title, items, onEdit, onDelete, isQuiz = false }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">🎥</span>
              <div>
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                {isQuiz && <p className="text-sm text-gray-600">Correct: {item.correctAnswer}</p>}
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => onEdit(item)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-md">
                ✏️
              </button>
              <button onClick={() => onDelete(item._id)} className="p-2 text-red-600 hover:bg-red-100 rounded-md">
                🗑️
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500 text-center py-8">No content available</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
