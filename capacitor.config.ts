import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.recruitg.app',
  appName: 'recruit-g',
  webDir: 'www',
  server: {
    url: 'http://3.111.31.121/mobile/dashboard',
    cleartext: true
  }
};

export default config;