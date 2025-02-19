import { Stack } from "expo-router";
import Header from "~/components/Header";

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          header: () => <Header title='Settings' />,
        }}
      />
      <Stack.Screen
        name='profile'
        options={{
          header: () => <Header title='Profile Settings' />,
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
