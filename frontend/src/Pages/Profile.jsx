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
import { Loader2 } from "lucide-react";

function Profile() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [records, setRecords] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get("/api/quiz/stats");
      const { quizzesAttempted, averageScore, bestScore, completionRate } =
        response.data.stats;

      if (user.accountType === "student") {
        setStats({
          quizzesAttempted: quizzesAttempted,
          averageScore: averageScore,
          bestScore: bestScore,
          completionRate: completionRate,
        });
      } else if (user.accountType === "teacher") {
        setStats({
          quizzesCreated: 8,
          totalParticipants: 124,
          completedAttempts: 96,
          averageScore: 76,
        });
      }
    };

    const fetchRecords = async () => {
      const response = await axios.get("/api/quiz/records");
      setRecords(response.data.records);
    };

    fetchStats();
    fetchRecords();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-7">
        <ProfileHeader user={user} />

        <ProfileInfoCard user={user} onEdit={() => setIsEditOpen(true)} />
        <ProfileStats user={user} stats={stats} />

        {records ? (
          <QuizHistory
            user={user}
            records={records}
            onView={(record) => setSelectedRecord(record)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
            <span>Loading your quiz history...</span>
          </div>
        )}

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
          <EditProfileModal
            user={user}
            setIsEditOpen={setIsEditOpen}
            onClose={() => setIsEditOpen(false)}
          />
        )}
      </div>
    </main>
  );
}

export default Profile;
