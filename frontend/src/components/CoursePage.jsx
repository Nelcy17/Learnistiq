import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight, Play, CheckCircle } from 'lucide-react';
import jsLectureVideo from '/src/assets/JS_lec.mp4';

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      try {
        const mockCourse = {
          _id: id,
          title: "Advanced JavaScript Development",
          instructor: "Nelcy Rathore",
          videoUrl: jsLectureVideo, 
          sections: [
            {
              title: "Section 1: The Basics of JS",
              lessons: [
                { id: "s1l1", title: "Introduction to JavaScript", duration: "10:30", completed: true, videoUrl: jsLectureVideo },
                { id: "s1l2", title: "Variables and Data Types", duration: "15:15", completed: false, videoUrl: jsLectureVideo },
                { id: "s1l3", title: "Control Flow and Loops", duration: "12:00", completed: false, videoUrl: jsLectureVideo },
              ],
            },
            {
              title: "Section 2: DOM Manipulation",
              lessons: [
                { id: "s2l1", title: "Selecting and Modifying Elements", duration: "18:45", completed: false, videoUrl: jsLectureVideo },
                { id: "s2l2", title: "Event Handling", duration: "20:00", completed: false, videoUrl: jsLectureVideo },
              ],
            },
            {
              title: "Section 3: Asynchronous JS",
              lessons: [
                { id: "s3l1", title: "Promises", duration: "25:00", completed: false, videoUrl: jsLectureVideo },
                { id: "s3l2", title: "Async/Await", duration: "30:00", completed: false, videoUrl: jsLectureVideo },
              ],
            },
          ],
        };
        setCourse(mockCourse);
        setActiveVideo(mockCourse.sections[0].lessons[0]);
      } catch (err) {
        setError("Failed to load course content. Please try again later.");
        console.error("Error fetching course content:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-700">Loading course...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  const handleVideoClick = (lesson) => {
    setActiveVideo(lesson);
  };

  const toggleSection = (sectionTitle) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <div className="flex-1 overflow-auto bg-white shadow-lg lg:h-full">
        {activeVideo && (
          <div className="w-full">
            <video
              key={activeVideo.videoUrl}
              controls
              autoPlay
              className="w-full h-auto max-h-[70vh] bg-black"
              src={activeVideo.videoUrl}
            />
          </div>
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{activeVideo?.title}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Instructor: <span className="font-semibold text-gray-700">{course.instructor}</span></span>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">About this Lesson</h2>
            <p className="text-gray-700">
              This lesson covers the fundamentals of {activeVideo?.title.toLowerCase()}. We will explore key concepts and provide hands-on examples to help you master the topic.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:w-96 w-full lg:h-full h-auto bg-white border-l border-gray-200 shadow-md overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Content</h2>
          {course.sections.map((section, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleSection(section.title)}
                className="flex justify-between items-center w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition"
              >
                <div className="flex items-center">
                  <ChevronRight
                    className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${openSections[section.title] ? 'rotate-90' : ''}`}
                  />
                  <span className="ml-2 font-semibold text-gray-700">{section.title}</span>
                </div>
                <span className="text-sm text-gray-500">{section.lessons.length} lessons</span>
              </button>
              {openSections[section.title] && (
                <ul className="mt-2 space-y-2 pl-4">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <li
                      key={lesson.id}
                      onClick={() => handleVideoClick(lesson)}
                      className={`flex items-center p-3 rounded-lg transition cursor-pointer
                      ${activeVideo?.id === lesson.id ? 'bg-purple-100 text-purple-700 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}
                    >
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <Play className="h-5 w-5 text-gray-500 mr-2" />
                      )}
                      <span className="flex-1">{lesson.title}</span>
                      <span className="text-xs text-gray-400">{lesson.duration}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
