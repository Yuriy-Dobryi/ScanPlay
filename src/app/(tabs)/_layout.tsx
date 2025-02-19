import { Tabs } from "expo-router";
import Header from "~/components/Header";
import TabBar from "~/components/TabBar";

const TabLayout = () => {
  return (
    <Tabs tabBar={() => <TabBar />}>
      <Tabs.Screen
        name='scan'
        options={{
          header: () => <Header title='Find a code to scan' />,
        }}
      />
      <Tabs.Screen
        name='history'
        options={{
          header: () => <Header title='History' />,
        }}
      />
      <Tabs.Screen name='settings' options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabLayout;
