# Starships App

This app is built using React Native and Expo, and allows you to browse, search, and manage a cart of Starships. Below are instructions to run the project locally and a summary of the main features.

---

## How to Run the Project

1. **Install Node.js** (if you do not have it already)

   Download from: https://nodejs.org/

2. **Install Expo CLI** globally

   ```bash
   npm install -g expo-cli
   ```

3. **Install Project Dependencies**

   Navigate to the project folder and run:

   ```bash
   npm install
   ```

   or if you use yarn:

   ```bash
   yarn
   ```

4. **Start the Expo Development Server**

   ```bash
   npm start
   ```

   or

   ```bash
   expo start
   ```

5. **Run on Your Device**

   - For Android/iOS devices: Install the **Expo Go** app from Google Play or App Store.
   - Scan the QR code shown in your terminal/web browser to open the app on your device.

---

## Features & Screens

### 1. Home Screen

- Shows a list of Starships from the Star Wars universe.
- Pagination is implemented, so you can scroll and load more starships as you reach the bottom.
- Each Starship is displayed with relevant information in a card layout.

### 2. Search Screen

- Allows you to search for Starships by name or other criteria.
- The search results are also paginated.
- Easy to find any specific Starship using the search bar.

### 3. Cart Screen

- Items (starships) added to the cart are displayed here.
- You can view all the Starships you wish to order.
- Total price of added items is shown.
- "Place Order" button (CTA) is available to proceed with your selection.

---

## Navigation

- The app uses a Bottom Tab Navigation, making it easy to switch between **Home**, **Search**, and **Cart** screens.

---

**Feel free to explore, search, and add your favorite Starships to your cart!**
