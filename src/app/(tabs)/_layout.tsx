import { Tabs } from "expo-router";
import TabBar from "~/components/TabBar";

const TabLayout = () => {
  return (
    <Tabs tabBar={() => <TabBar />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='scan' />
      <Tabs.Screen name='history' />
      <Tabs.Screen name='settings' />
    </Tabs>
  );
};

export default TabLayout;
