# Setup and Installation
Make sure you have the following installed:
1. Node.js (latest LTS version)
2. React Native CLI (npm install -g react-native-cli)
3. Android Studio (for Android development)

# Steps to Run the App
1. Clone the Repository (git clone gitprojectlink)
2. Install Dependencies (npm install)
3. Run App(npx react-native run-android)

# Assumptions made and challenges faced.
1. A third-party email API is used to send emails. (SendGrid)
2. Users can save drafts locally, even without internet access
3. The logout button effectively clears AsyncStorage and logs the user out.
4. The search functionality allows users to quickly filter through emails. (bonus features implemented)
5. Real-time email sending functionality