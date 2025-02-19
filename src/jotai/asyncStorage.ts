import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'jotai/utils';

export const asyncStorage = createJSONStorage<any>(() => AsyncStorage);
