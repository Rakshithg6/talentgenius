
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "@/components/settings/ProfileSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import DeleteAccount from "@/components/settings/DeleteAccount";

const Settings = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get("tab");
  const [activeTab, setActiveTab] = React.useState<string>("profile");
  
  useEffect(() => {
    if (tabParam === "notifications") {
      setActiveTab("notifications");
    } else if (tabParam === "delete-account") {
      setActiveTab("delete-account");
    } else {
      setActiveTab("profile");
    }
  }, [tabParam]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow page-container py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Settings
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Manage your account settings and preferences
          </p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="delete-account" className="text-destructive">Delete Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <ProfileSettings />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
            
            <TabsContent value="delete-account">
              <DeleteAccount />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
