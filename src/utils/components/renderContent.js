import HomeLoginPlease from "../../components/HomeCalendarSubComponets/HomeCalendarPleaseForLogin";
import HomeCalendarLoading from "../../components/HomeCalendarSubComponets/HomeCalendarLoading";

export const renderContent = (user, error, loading) => {
  if (!user) return <HomeLoginPlease />;
  if (loading) return <HomeCalendarLoading />;
  if (error) return <div className="text-red-500 mb-4">Error: {error}</div>;
  return null;
};
