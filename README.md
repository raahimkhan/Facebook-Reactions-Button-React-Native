# Reaction Button with Animated Tooltip

A fully interactive and customizable reaction button component for React Native. Created entirely from scratch using `Reanimated V3`, i.e., no third party libraries utilised. This component allows users to "like" or "unlike" with a simple button press, and provides an engaging emoji selection experience with animated reactions, tooltips, and haptic feedback. Perfect for building rich, interactive user interfaces in chat applications, social media apps, or any app requiring dynamic reactions.

Uploading FacebookReactionsButton.mp4…

## Features

- **Like/Unlike on Simple Button Press**: A simple button press toggles the like/unlike state. If the iOS ringer is off, it plays a sound on click; otherwise, it uses haptic feedback for a more immersive user experience.
  
- **Long Press to Open Reaction Container**: Long pressing the button opens a container with animated reactions (e.g., GIFs). The container opens with a smooth animation, and after the long press, users can interact with the animated reactions.

- **Interactive Reactions with Scale and Translation Animations**: The reactions in the container scale and move just like on the meta platform. When a reaction is selected, haptic feedback is triggered, and sound is played if the iOS ringer is not silent.

- **Dynamic Tooltips**: Tooltips appear above the animated gifs, showing the reaction name. The tooltips are dynamically positioned based on the screen space available to ensure an optimal user experience.

- **Automatic Positioning**: The reactions and tooltips automatically adjust their position depending on the available vertical space on the screen, ensuring they are always visible and correctly placed.

- **Animated Emoji Selection**: Upon selection, the animated gif follows a smooth, animated trajectory to visually represent the emoji being selected, enhancing the interactivity of the button.

## Disclaimer

This component has only been tested on iOS devices. Support for Android devices is expected to be implemented down the timeline whenever I have the available time and bandwidth. Contributions and pull requests are welcome!

## Running the Project

To run the project locally:

1. Clone the repository: `https://github.com/raahimkhan/Facebook-Reactions-Button-React-Native.git`
2. Navigate to project directory: `cd Facebook-Reactions-Button-React-Native`
3. Install the required dependencies: `npm install && cd ios && pod install`
4. Install the development client for iOS simulator: `npx expo run:ios`
5. For subsequent runs, you can use Expo Go by starting the project with: `npx expo start`
   - Press `i` to open the app in the iOS simulator.
