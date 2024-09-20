# Whack-a-Mole Game

Copyright (c) [2024] Hokin Deng

LICENSE
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense for non-commericial uses. 

## Overview
Welcome to **Whack-a-Mole**, an interactive browser-based game where you challenge your reflexes by whacking marmots as they pop out of their holes. The game uses your keyboard to map keys to each hole, and your goal is to hit the marmots as fast as possible to earn points. Have fun and improve your reaction speed!

## Game Features
- **Interactive Key Mapping**: The game features a practice-mapping block, where you can learn the key mappings (H, U, I, B, L) for the marmots that pop up. There are three different key-to-hole mapping contexts indicated by colors: Rose, Blue, and Purple.
- **Dynamic Grid Layout**: The game features a 3x3 grid where marmots appear randomly in different holes.
- **Score Tracking**: The game keeps track of your score as you whack the marmots.
- **Fun Visuals**: Colorful visuals and context cues help guide you through the game.

## How to Play

1. **Start the Game**: 
   - When you load the game, you'll be greeted with a "Welcome to Whack-a-Mole" screen.
   - Click the **START GAME** button to begin the game.

2. **Key Mapping**: 
   - As the marmots appear in the holes, press the corresponding keys (H, U, I, B, L) on your keyboard to whack them. 
   - You can only press each key once per marmot appearance.

3. **Context Cue**:
   - A color box at the top of the game indicates which key-to-hole mapping context you're in:
     - **Rose (Pink)**, **Blue**, or **Purple**. The game will adjust based on the context, so keep an eye out for the color changes!

## Setup Instructions

1. **Download or Clone** the game repository to your local machine.
2. Ensure you have the necessary files in the correct structure as outlined above.
3. Open `index.html` in your browser.
4. The game will start with a welcome screen. Click **START GAME** to begin.

## Technologies Used

- **HTML**: Structure of the game.
- **CSS**: Styling for the game layout and animations.
- **JavaScript**: Game logic, key mapping, and context handling.
- **Audio and Images**: Background music and game visuals.

## Key Components

### Audio
- There are three audio files (banc.mp3, chui.mp3, da.mp3) loaded into the game for background music and sound effects. You can customize these files to change the game experience.

### Score & Context
- The game tracks your score with a visual score counter displayed on the top-right of the game screen.
- The current context (Rose, Blue, or Purple) is visually represented by a colored box at the top of the game, changing dynamically as you progress.

### Marmot Grid
- The game uses a 3x3 grid where marmots randomly appear. Players must respond by pressing the corresponding keys mapped to the holes. The faster you react, the higher your score!

## Customization

### Key to Hole Mapping
The key-to-hole mappings are pre-set, but you can modify the key mappings in the `total.js` file if you want to change the controls.

### Visual Elements
Feel free to modify the images in the `/image` folder and the corresponding CSS in `style.css` if you wish to change the appearance of the marmots or the game layout.

### Background Music
You can replace the audio files in the `/music` folder to change the background music and sound effects.

## Future Enhancements

- **Levels and Difficulty**: Implement different levels or speeds to challenge players.
- **Mobile Compatibility**: Adapt the game for mobile devices using touch inputs.
- **Leaderboard**: Add a feature to store high scores and display them to players.

## File Structure

```
/game-directory
|-- index.html        # Main HTML file containing the game layout
|-- style.css         # CSS for styling the game
|-- total.js          # JavaScript file containing game logic
|-- /music            # Folder containing game audio
|   |-- banc.mp3      # Background music 1
|   |-- chui.mp3      # Background music 2
|   |-- da.mp3        # Background music 3
|-- /image            # image materials
```

Enjoy your Whack-a-Mole
