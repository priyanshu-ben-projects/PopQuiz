import { useState, useContext, useEffect } from "react";
import axios from "axios";

import ProfileHeader from "../Components/profile/ProfileHeader.jsx";
import ProfileInfoCard from "../components/profile/ProfileInfoCard.jsx";
import ProfileStats from "../components/profile/ProfileStats";
import QuizHistory from "../components/profile/QuizHistory";
import EditProfileModal from "../components/profile/EditProfileModal";
import QuizDetailsModal from "../components/profile/QuizDetailsModal";
import TeacherAnalyticsModal from "../components/profile/TeacherAnalyticsModal";
import AuthContext from "../context/AuthContext.js";

function Profile() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get("/api/quiz/stats");
      console.log(response.data);

      const stats = {
        quizzesAttempted: response.data.quizzesAttempted,
        averageScore: response.data.averageScore,
        bestScore: response.data.bestScore,
        completionRate: response.data.completeRate,
      };
      setStats(stats);
    };

    fetchStats();
  });

  // Temporary Data :

  // Teacher Specific
  // const stats = {
  //   quizzesCreated: 8,
  //   totalParticipants: 124,
  //   completedAttempts: 96,
  //   averageScore: 76,
  // };

  const [selectedRecord, setSelectedRecord] = useState(null);

  const records = [
    {
      _id: "quiz-1",
      title: "JavaScript Fundamentals",
      category: "Programming",
      score: 85,
      date: "2026-10-20",
      status: "completed",
      participants: 18,
    },
    {
      _id: "quiz-2",
      title: "React Basics",
      category: "Web Development",
      score: 72,
      date: "2026-10-22",
      status: "completed",
      participants: 24,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-7">
        <ProfileHeader user={user} />

        <ProfileInfoCard user={user} onEdit={() => setIsEditOpen(true)} />
        <ProfileStats user={user} stats={stats} />

        <QuizHistory
          user={user}
          records={records}
          onView={(record) => setSelectedRecord(record)}
        />

        {selectedRecord &&
          (user?.accountType === "teacher" ? (
            <TeacherAnalyticsModal
              record={selectedRecord}
              onClose={() => setSelectedRecord(null)}
            />
          ) : (
            <QuizDetailsModal
              record={selectedRecord}
              onClose={() => setSelectedRecord(null)}
            />
          ))}
        {isEditOpen && (
          <EditProfileModal user={user} onClose={() => setIsEditOpen(false)} />
        )}
      </div>
    </main>
  );
}

export default Profile;
